"""Build the portfolio's three fillable PDF workbooks and matching card artwork.

Requires Python 3.9+, reportlab, Pillow and pypdf. Run with --output-dir PATH.
The generated files retain the portfolio's existing download filenames.
"""
from pathlib import Path
import argparse
import html
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF
from PIL import Image, ImageDraw, ImageFont
from pypdf import PdfReader

W, H = 595.276, 841.89
M, CW = 46, 503.276
NAVY, INK, MUTED, LINE = '#101D36', '#17243A', '#526078', '#DCE3ED'
FONT_DIR = Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('Body', str(FONT_DIR / 'arial.ttf')))
pdfmetrics.registerFont(TTFont('Bold', str(FONT_DIR / 'arialbd.ttf')))
pdfmetrics.registerFont(TTFont('Mono', str(FONT_DIR / 'consola.ttf')))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Body', boldItalic='Bold')

DATA = [
 dict(slug='conversion-optimization-guide', title='Conversion Optimization Guide',
      short='CONVERSION', color='#4E46C8', kicker='FOR FOUNDERS & SERVICE BUSINESSES',
      cover=['Turn visitors into', 'qualified inquiries.'],
      promise='Find the gaps between your offer, your proof and your contact form - then plan one measurable improvement.',
      time='30-minute first pass', benefit='A clearer offer and a testable next step',
      sections=[('01', 'Set one conversion goal', 'Choose a page, audience and success metric.'),
                ('02', 'Audit the path to inquiry', 'Use seven checks to find avoidable friction.'),
                ('03', 'Rewrite the critical moments', 'Apply offer, proof and form examples.'),
                ('04', 'Plan your first experiment', 'Record a hypothesis and a decision rule.')],
      cta='Turn your findings into a focused refresh.',
      cta_body='Share your page URL, your main goal and the biggest gap you found. We can discuss scope for a Conversion Refresh.',
      cta_path='/en/contact', cta_label='Discuss a conversion refresh',
      thumb=['Conversion', 'Optimization Guide'], thumb_sub='7-point audit + experiment worksheet'),
 dict(slug='web-performance-checklist', title='Web Performance Checklist',
      short='PERFORMANCE', color='#007D78', kicker='FOR FOUNDERS, MARKETERS & DEVELOPERS',
      cover=['Find what makes', 'your site feel slow.'],
      promise='Measure a real page, identify the likely bottleneck and leave with a short list of fixes you can verify.',
      time='30-minute first pass', benefit='A baseline and a prioritized fix list',
      sections=[('01', 'Measure before changing', 'Record the page, device and starting point.'),
                ('02', 'Run the performance checks', 'Review loading, interaction and stability.'),
                ('03', 'Choose fixes from evidence', 'Match symptoms to practical investigations.'),
                ('04', 'Build a verification plan', 'Assign the next fix and compare the result.')],
      cta='Bring your baseline to a performance review.',
      cta_body='Share your URL, your mobile report and the interaction that feels slow. We can discuss a focused performance and accessibility audit.',
      cta_path='/en/services', cta_label='Explore Conversion Refresh',
      thumb=['Web Performance', 'Checklist'], thumb_sub='8 checks + baseline and fix planner'),
 dict(slug='nextjs-best-practices', title='Next.js Best Practices Toolkit',
      short='ENGINEERING', color='#3159CE', kicker='FOR NEXT.JS APP ROUTER DEVELOPERS',
      cover=['Launch with', 'fewer surprises.'],
      promise='Review rendering, data boundaries and the release path before your next production deployment.',
      time='45-minute first pass', benefit='A launch review and a release decision',
      sections=[('01', 'Define your release context', 'Record the version and critical route.'),
                ('02', 'Review the architecture', 'Check rendering, caching and trust boundaries.'),
                ('03', 'Verify the risky paths', 'Use two small patterns and release checks.'),
                ('04', 'Make a go / no-go decision', 'Record blockers, ownership and rollback.')],
      cta='Get a second pair of eyes before launch.',
      cta_body='Share the route you are shipping, the Next.js version and your release blockers. We can discuss architecture or launch support.',
      cta_path='/en/contact', cta_label='Discuss your Next.js launch',
      thumb=['Next.js Best', 'Practices Toolkit'], thumb_sub='8 checks + patterns and release planner'),
]

class Book:
    def __init__(self, d, out):
        self.d, self.out, self.page, self.fields = d, out, 0, []
        self.c = canvas.Canvas(str(out / (d['slug'] + '.pdf')), pagesize=(W,H), pageCompression=1)
        self.c.setTitle(d['title'])
        self.c.setAuthor('Mohammed-Amine Madah | amilemia.dev')
        self.c.setSubject(d['promise'])
        self.c.setKeywords('amilemia.dev, ' + d['short'].lower() + ', fillable workbook')
        self.c._doc.Catalog.Lang = PDFString('en-US')

    def para(self, text, x, top, width=CW, size=10.5, leading=15, color=INK, bold=False):
        p=Paragraph(text.replace('\n','<br/>'), ParagraphStyle('p', fontName='Bold' if bold else 'Body', fontSize=size,
                    leading=leading, textColor=HexColor(color), spaceAfter=0))
        _,h=p.wrap(width,H)
        assert top+h < H-45, (self.d['slug'], self.page, text[:40], top+h)
        p.drawOn(self.c,x,H-top-h)
        return top+h

    def text(self,text,x,top,size=10,color=INK,bold=False,font='Body'):
        self.c.setFillColor(HexColor(color)); self.c.setFont('Bold' if bold else font,size)
        self.c.drawString(x,H-top-size,text)

    def box(self,x,top,width,height,color,stroke=None,r=8):
        self.c.setFillColor(HexColor(color))
        self.c.setStrokeColor(HexColor(stroke or color))
        self.c.roundRect(x,H-top-height,width,height,r,fill=1,stroke=bool(stroke))

    def start(self, label=None, title=None, intro=None):
        self.page+=1
        self.c.bookmarkPage('page'+str(self.page))
        self.c.addOutlineEntry(self.d['sections'][self.page-1][1], 'page'+str(self.page), level=0)
        self.c.setFillColor(white);self.c.rect(0,0,W,H,fill=1,stroke=0)
        self.box(M,28,19,4,self.d['color'],r=1)
        self.text('amilemia.dev',M+27,23,11,NAVY,True)
        self.text(self.d['short']+' / WORKBOOK',W-235,25,8,MUTED)
        if title:
            self.text(label,M,76,9,self.d['color'],True)
            self.para(title,M,100,size=29,leading=33,bold=True,color=NAVY)
            if intro:self.para(intro,M,178,size=10.5,leading=15,color=MUTED)

    def field(self,name,label,top,height=30,x=M,width=CW):
        self.text(label,x,top,9,MUTED,True)
        field_name=self.d['slug']+'_'+name
        self.fields.append(field_name)
        self.c.acroForm.textfield(name=field_name,tooltip=label,x=x,y=H-top-17-height,
            width=width,height=height,fontName='Helvetica',fontSize=10,
            textColor=HexColor(INK),borderColor=HexColor(LINE),fillColor=HexColor('#F7F9FC'),
            borderWidth=0.7,borderStyle='solid',forceBorder=True,
            fieldFlags='multiline' if height>35 else '',maxlen=700 if height>35 else 180)

    def check(self,name,title,body,top):
        field_name=self.d['slug']+'_'+name
        self.fields.append(field_name)
        self.c.acroForm.checkbox(name=field_name,tooltip=title,x=M,y=H-top-14,size=13,
            checked=False,buttonStyle='check',borderWidth=1,borderColor=HexColor(self.d['color']),
            fillColor=white,textColor=HexColor(self.d['color']),forceBorder=True)
        self.para(title,M+25,top-2,CW-25,10.5,14,bold=True)
        self.para(body,M+25,top+17,CW-25,9.5,13,color=MUTED)

    def note(self,title,body,top,height=76):
        self.box(M,top,CW,height,'#F1F4FA')
        self.text(title,M+15,top+12,10,self.d['color'],True)
        self.para(body,M+15,top+33,CW-30,9.5,13)

    def end(self):
        c=self.c
        c.setStrokeColor(HexColor(LINE));c.setLineWidth(.6);c.line(M,48,W-M,48)
        self.text('Mohammed-Amine Madah',M,H-38,8,MUTED)
        self.text('amilemia.dev',M+215,H-38,8,self.d['color'],True)
        c.linkURL('https://amilemia.dev/en', (M+215,23,M+275,39),relative=0,thickness=0)
        self.text(f'{self.page:02d} / 04',W-M-40,H-38,8,MUTED)
        c.showPage()

    def cover(self):
        self.start()
        self.box(0,65,W,305,NAVY,r=0)
        self.box(M,90,38,4,self.d['color'],r=1)
        self.text(self.d['kicker'],M,112,8,'#B6C7ED',True)
        y=141
        for line in self.d['cover']:
            self.text(line,M,y,35,'#FFFFFF',True); y+=42
        self.para(self.d['promise'],M,246,CW-12,12,18,'#D6DFEF')
        self.text('4 PAGES  /  FILLABLE PDF  /  '+self.d['time'].upper(),M,337,8,'#BBCBE6',True)
        self.text(self.d['title'],M,391,16,NAVY,True)
        self.para(self.d['benefit']+'.',M,418,size=11,color=MUTED)
        y=458
        for num,title,desc in self.d['sections']:
            self.text(num,M,y,14,self.d['color'],True)
            self.text(title,M+36,y,11,INK,True)
            self.text(desc,M+36,y+20,9,MUTED)
            y+=52
        self.field('page_url','Website / route to review',676,25)
        self.para('Type into the fields or print this workbook. Save a copy after filling it in; viewer support varies.',M,733,size=8.5,leading=12,color=MUTED)
        self.end()

    def cta(self,top):
        url='https://amilemia.dev'+self.d['cta_path']+'?utm_source=lead_magnet&utm_medium=pdf&utm_campaign='+self.d['slug']
        self.box(M,top,CW,131,NAVY)
        self.para(self.d['cta'],M+16,top+15,CW-105,14,18,'#FFFFFF',True)
        self.para(self.d['cta_body'],M+16,top+44,CW-105,9.3,13,'#D6DFEF')
        self.text(self.d['cta_label']+' >',M+16,top+105,10,'#FFFFFF',True)
        self.c.linkURL(url,(M+14,H-top-126,M+CW-92,H-top-14),relative=0,thickness=0)
        widget=qr.QrCodeWidget(url)
        bx,by,bw,bh=widget.getBounds();sz=69
        drawing=Drawing(sz,sz,transform=[sz/(bw-bx),0,0,sz/(bh-by),0,0]);drawing.add(widget)
        self.box(W-M-84,top+22,73,73,'#FFFFFF',r=2)
        renderPDF.draw(drawing,self.c,W-M-82,H-top-93)
        self.text('Scan to explore',W-M-85,top+104,7,'#D6DFEF')

    def sources(self,items,top):
        self.text('READ MORE / PRIMARY SOURCES',M,top,8,MUTED,True)
        y=top+17
        for title,url in items:
            self.para('<link href="'+html.escape(url,quote=True)+'" color="'+self.d['color']+'">'+html.escape(title)+'</link>',M,y,size=8,leading=11)
            y+=15
        self.text('Edition 01 / October 2026. Recheck guidance for your framework version.',M,y+3,7.5,MUTED)

    def save(self):
        self.c.save()
        path=self.out/(self.d['slug']+'.pdf')
        reader=PdfReader(path)
        assert len(reader.pages)==4
        fields=reader.get_fields()
        assert len(self.fields)==len(set(self.fields)), 'Duplicate form field names'
        assert fields and set(fields)==set(self.fields)
        print(path.name,':',len(reader.pages),'pages,',len(fields),'fillable fields,',path.stat().st_size,'bytes')

def conversion(b):
    b.start('02 / AUDIT','Is the next step\nclear enough?',
            'Tick only what you can demonstrate on the page. Unticked items become candidates for improvement, not a conversion score.')
    checks=[
      ('goal','One primary conversion','Name one action for this page: qualified inquiry, booked call or signup. Keep the main CTA aligned with it.'),
      ('offer','An offer a visitor can explain','State who you help, what changes for them and what you deliver. Ask someone to repeat it back after a short look.'),
      ('scope','Scope without guesswork','Explain deliverables, exclusions and the next step. Show pricing or a meaningful starting range only when accurate.'),
      ('proof','Evidence beside the decision','Connect a real case study, screenshot or attributed quote to the relevant claim. Give metrics context and a time period.'),
      ('cta','A specific call to action','Use a clear verb and outcome, such as "Discuss my website refresh". Explain what happens after the click.'),
      ('form','A form that earns each field','Ask only what is needed now. Use visible labels, useful errors and a clear success state; preserve entries on errors.'),
      ('mobile','A complete mobile path','Try the page with one hand and by keyboard. Check readable text, visible focus, usable buttons and the full submission path.'),
    ]
    for i,(name,title,body) in enumerate(checks):b.check(name,title,body,232+i*62)
    b.note('Pick the closest obstacle to the goal','Start with a broken form or unclear offer before polishing decorative details. Choose one gap you can investigate this week.',679,75)
    b.end()
    b.start('03 / APPLY','Make the offer\neasy to act on.',
            'Use these examples as starting points. Replace every audience, scope and proof claim with something true for your business.')
    b.note('OFFER / Before','"We build innovative digital experiences."',232,63)
    b.note('OFFER / After - illustrative copy','"A focused website refresh for service businesses: clearer offers, faster pages and a simpler path to inquiry."',309,77)
    b.text('Show the proof before asking for commitment',M,410,13,NAVY,True)
    b.para('Pair the offer with one relevant project: the problem, what you changed, and the evidence available. If you cannot attribute a business result, show the delivered work and explain how it was verified.',M,437,size=10.5,leading=16)
    b.text('Match the form to the decision',M,505,13,NAVY,True)
    b.para('For a first conversation, try name, email, website URL and one goal. Collect budget or detailed scope when it helps qualification. A multi-step form is an option to test, not a guaranteed improvement.',M,532,size=10.5,leading=16)
    b.text('Measure the path, not just the click',M,600,13,NAVY,True)
    b.para('Track the primary CTA, form start, successful submission and qualified inquiry. Count submissions only after success. Keep personal data out of analytics event properties and check events in your tool.',M,627,size=10.5,leading=16)
    b.note('A useful conversion rate','Qualified inquiries / eligible page sessions x 100. Define "qualified", the date range and traffic source before comparing results.',697,59)
    b.end()
    b.start('04 / EXPERIMENT','Plan one change.\nDecide from evidence.',
            'Keep the audience, traffic source and measurement window comparable. These fields form your experiment brief.')
    b.field('metric','Goal + metric definition + baseline + date range',229,37)
    b.field('hypothesis','If we change [one thing], then [metric] will improve because [reason]',296,43)
    b.field('decision','Success threshold + guardrail + minimum sample / duration + decision date',369,43)
    b.note('Low traffic? Start with a usability check.','Ask relevant people to complete the task and describe what confused them. For an A/B test, plan sample size and duration first; before/after changes alone do not establish causation.',453,82)
    b.cta(551)
    b.sources([('W3C WAI / Accessible forms','https://www.w3.org/WAI/tutorials/forms/'),
               ('Google Analytics / Event measurement','https://developers.google.com/analytics/devguides/collection/ga4/events')],701)
    b.end()

def performance(b):
    b.start('02 / CHECK','Measure the experience.\nThen find the cause.',
            'Start with one important URL on mobile. Use field data for real-user outcomes and lab tools to investigate repeatable problems.')
    metrics=[('LCP','<= 2.5 s','Loading'),('INP','<= 200 ms','Responsiveness'),('CLS','<= 0.1','Visual stability')]
    for i,(metric,value,label) in enumerate(metrics):
        x=M+i*173
        b.box(x,228,157,78,'#EEF6F5')
        b.text(metric,x+13,237,9,b.d['color'],True)
        b.text(value,x+13,254,20,NAVY,True)
        b.text(label,x+13,282,8,MUTED)
    b.para('Good thresholds at the 75th percentile, evaluated separately for mobile and desktop. A Lighthouse score alone does not establish a Core Web Vitals pass.',M,319,size=9,leading=13,color=MUTED)
    checks=[
      ('baseline','Record a repeatable baseline','Save PageSpeed Insights field data when available, plus URL, device and date. Note whether the result is page-level or origin-level.'),
      ('lcp','Identify the actual LCP element','Inspect the hero image or text in a performance trace. Check when its resource is discovered and when the element becomes visible.'),
      ('images','Make important media discoverable','Size and compress images for their display width. Avoid lazy-loading the LCP image; reserve lazy loading for offscreen media.'),
      ('inp','Exercise real interactions','Open the menu, type, filter and submit. Look for long main-thread work and expensive rendering around slow actions.'),
      ('cls','Reserve space before content arrives','Set media dimensions or aspect ratios. Test font swaps, embeds, banners and async content for unexpected movement.'),
      ('delivery','Check the delivery path','Inspect slow server responses, repeated requests and caching. Keep personalized responses out of shared public caches.'),
      ('scripts','Review third-party work','Measure the cost of widgets, analytics and chat. Defer nonessential work and remove scripts that no longer serve a purpose.'),
      ('verify','Recheck the business task','Repeat the same scenario after the fix. Confirm the menu, checkout or form still works and record the comparison.'),
    ]
    for i,(name,title,body) in enumerate(checks):b.check(name,title,body,365+i*48)
    b.end()
    b.start('03 / DIAGNOSE','Choose the fix\nfrom the symptom.',
            'These are investigation prompts, not diagnoses. Change one bottleneck at a time and compare equivalent test conditions.')
    blocks=[('The hero appears late','Inspect the document response and LCP resource timing. Check server latency, image discovery and render delay. If the image starts late, make it discoverable in the initial HTML and consider a priority hint.'),
            ('Buttons respond after a pause','Record the slow interaction. Reduce synchronous work in its handler, split large tasks and avoid rerendering an oversized component tree. Deferring a script helps only if that script caused the delay.'),
            ('Content jumps while loading','Watch a recording with layout-shift regions visible. Reserve space for late content, stabilize font metrics and place new banners so they do not push existing content unexpectedly.'),
            ('The lab result and real users disagree','Compare devices, networks, geography, cache state and interactions. A short lab run is a controlled sample; field data reflects a broader time window. Record both instead of choosing the nicer number.')]
    for i,(title,body) in enumerate(blocks):
        top=232+i*119
        b.text(f'0{i+1}',M,top,15,b.d['color'],True)
        b.para(title,M+36,top,CW-36,12,16,bold=True)
        b.para(body,M+36,top+29,CW-36,10.3,15)
    b.note('No field data yet?','Write "not available" in your baseline, use lab tests to find problems and add real-user measurement when appropriate. A lab run cannot replace field INP.',711,56)
    b.end()
    b.start('04 / PRIORITIZE','Keep a baseline.\nShip a verifiable fix.',
            'Prioritize a broken task first, then the strongest measured bottleneck on an important route. Record the evidence for your choice.')
    b.field('baseline_record','Baseline: URL / device / date / tool / LCP / INP / CLS (use N/A where needed)',230,42)
    b.field('fix','First fix: observed problem / evidence / proposed change / owner',302,42)
    b.field('verification','Verification: same test conditions / before and after / regression check / review date',374,42)
    b.note('Interpret the result carefully','A lab improvement is an early signal. Watch real-user trends as fresh data arrives; historical field reports will not change immediately after a deployment.',450,72)
    b.cta(540)
    b.sources([('Google web.dev / Core Web Vitals and thresholds','https://web.dev/articles/vitals'),
               ('Google web.dev / Optimize LCP','https://web.dev/articles/optimize-lcp'),
               ('Google web.dev / Optimize INP','https://web.dev/articles/optimize-inp')],688)
    b.end()

def nextjs(b):
    b.start('02 / ARCHITECTURE','Make the boundaries\nintentional.',
            'This toolkit targets Next.js 15 App Router, matching this portfolio. Confirm behavior against your installed version, especially on Next.js 16+.')
    checks=[
      ('version','Record your runtime and version','Run npm ls next react react-dom. Note the hosting runtime and the route being reviewed; do not assume all projects use the same defaults.'),
      ('rendering','Choose rendering per route','Keep public content prerendered when it fits. Use request-time rendering when the task needs it, such as personalized content.'),
      ('client','Keep client boundaries focused','Put state, effects and browser APIs in small Client Components. Keep server-only data and secrets on the server.'),
      ('query','Isolate query-dependent UI','On static routes, wrap the Client Component that calls useSearchParams in a useful Suspense boundary. Confirm this in a production build.'),
      ('cache','Specify data freshness deliberately','In Next.js 15, fetch requests are not cached by default. Select no-store, force-cache or a revalidation strategy to fit the data.'),
      ('auth','Enforce trust at the server boundary','Validate untrusted input. Authorize each protected read or mutation on the server; hiding a button does not protect an operation.'),
      ('seo','Make localized pages discoverable','Check titles, canonical URLs, language alternatives and sitemap entries. Allow crawlers to load assets required to render the page.'),
      ('fallbacks','Check failure and loading states','Use meaningful loading, error and not-found states. Test navigation, slow responses and failed submissions instead of removing boundaries by default.'),
    ]
    for i,(name,title,body) in enumerate(checks):b.check(name,title,body,232+i*64)
    b.end()
    b.start('03 / VERIFY','Two small patterns.\nOne real release check.',
            'These focused examples illustrate boundaries; they are not a full starter repository or a complete security implementation.')
    b.text('01 / Give static routes a query fallback',M,231,12,NAVY,True)
    code1="import { Suspense } from 'react'\nimport SearchFilters from './search-filters'\n\nexport default function Page() {\n  return (\n    <Suspense fallback={<p>Loading filters...</p>}>\n      <SearchFilters />\n    </Suspense>\n  )\n}"
    b.box(M,258,CW,157,NAVY)
    for i,line in enumerate(code1.splitlines()):b.text(line,M+14,270+i*13,9,'#E1E9FA',font='Mono')
    b.para('SearchFilters is a Client Component that reads useSearchParams. Keep the page content outside this boundary when it does not depend on the query.',M,426,size=9.5,leading=14,color=MUTED)
    b.text('02 / State the cache policy',M,477,12,NAVY,True)
    code2="// Public content: an explicit freshness window.\nconst response = await fetch(CMS_URL, {\n  next: { revalidate: 3600 },\n})\nif (!response.ok) throw new Error('CMS unavailable')"
    b.box(M,504,CW,91,NAVY)
    for i,line in enumerate(code2.splitlines()):b.text(line,M+14,515+i*14,9,'#E1E9FA',font='Mono')
    b.para('Use no-store for data that must be read fresh on every request. Review authentication and cache scope before caching user-specific data.',M,607,size=9.5,leading=14,color=MUTED)
    b.note('Verify the production path','Run the project\'s lint, type and test checks, then a production build. On a preview deployment, inspect HTML, use keyboard navigation, switch locale and submit the critical form with controlled test data.',665,90)
    b.end()
    b.start('04 / RELEASE','Make the launch\ndecision explicit.',
            'Keep this record with the release. A completed checklist supports a review; it is not a security certification or a guarantee of readiness.')
    b.field('context','Release context: Next.js version / commit / preview URL / route / runtime',230,36)
    b.field('blockers','Blockers: issue / user impact / owner / fix or reason for accepting the risk',295,43)
    b.field('decision','Decision: go or no-go / reviewer / date / checks and evidence',367,36)
    b.field('rollback','Rollback: known-good deployment / trigger / owner / post-launch checks',432,36)
    b.cta(511)
    b.sources([('Next.js 15 / useSearchParams and Suspense','https://nextjs.org/docs/15/app/api-reference/functions/use-search-params'),
               ('Next.js / Caching (previous model; no Cache Components)','https://nextjs.org/docs/app/guides/caching'),
               ('Next.js / Production checklist','https://nextjs.org/docs/app/guides/production-checklist')],660)
    b.para('Continue with the Web Performance Checklist at <link href="https://amilemia.dev/en/resources" color="'+b.d['color']+'">amilemia.dev/en/resources</link>.',M,740,size=8.5,leading=12,color=MUTED)
    b.end()

def thumbnail(d,out):
    im=Image.new('RGB',(1200,675),NAVY);draw=ImageDraw.Draw(im)
    bold=lambda s:ImageFont.truetype(str(FONT_DIR/'arialbd.ttf'),s)
    regular=lambda s:ImageFont.truetype(str(FONT_DIR/'arial.ttf'),s)
    draw.rounded_rectangle((810,88,1320,602),radius=25,fill=d['color'])
    draw.text((60,42),'amilemia.dev / FREE WORKBOOK',font=bold(20),fill='#BFCDE4')
    draw.rectangle((60,114,120,121),fill=d['color'])
    draw.text((60,162),d['short'],font=bold(21),fill='#AFC2EE')
    for i,line in enumerate(d['thumb']):draw.text((60,211+i*73),line,font=bold(60),fill='white')
    draw.text((60,410),d['thumb_sub'],font=regular(25),fill='#D6DFEF')
    draw.rounded_rectangle((60,522,596,580),radius=10,fill='#243651')
    draw.text((80,537),'4 PAGES   /   FILLABLE PDF',font=bold(23),fill='white')
    draw.text((887,139),'01-04',font=bold(40),fill='white')
    for i in range(4):
        y=252+i*62
        draw.rounded_rectangle((865,y,891,y+26),radius=3,outline='white',width=3)
        draw.line((913,y+5,1120,y+5),fill='#D6DFEF',width=5)
        draw.line((913,y+21,1060,y+21),fill='#B2C2E0',width=3)
    im.save(out/(d['slug']+'.png'),optimize=True)

def build(out):
    out.mkdir(parents=True,exist_ok=True)
    for d,fn in zip(DATA,[conversion,performance,nextjs]):
        b=Book(d,out);b.cover();fn(b);b.save();thumbnail(d,out)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--output-dir',type=Path,required=True)
    build(p.parse_args().output_dir)
