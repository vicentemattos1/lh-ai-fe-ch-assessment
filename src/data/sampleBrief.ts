import { Brief } from '../types';

export const sampleBrief: Brief = {
  id: 'brief-001',
  title: 'Motion to Dismiss for Failure to State a Claim',
  content: `# MEMORANDUM IN SUPPORT OF DEFENDANT'S MOTION TO DISMISS

## I. INTRODUCTION

Defendant TechCorp Industries moves to dismiss Plaintiff's Complaint for failure to state a claim upon which relief can be granted. The Complaint's securities fraud allegations fall far short of the heightened pleading requirements established by Congress and interpreted by the Supreme Court.

## II. LEGAL STANDARD

To survive a motion to dismiss under Rule 12(b)(6), a complaint must contain "enough facts to state a claim to relief that is plausible on its face." [[CITATION:1]] A claim is facially plausible "when the plaintiff pleads factual content that allows the court to draw the reasonable inference that the defendant is liable for the misconduct alleged." [[CITATION:2]]

For securities fraud claims under Section 10(b) and Rule 10b-5, plaintiffs must meet the heightened pleading requirements of the **Private Securities Litigation Reform Act** ("PSLRA"). The complaint must:

1. Specify each statement alleged to have been misleading
2. State the reason or reasons why the statement is misleading
3. Plead with particularity facts giving rise to a strong inference of scienter

See [[CITATION:3]]

## III. ARGUMENT

### A. Plaintiff Fails to Plead Material Misrepresentation

The Complaint does not identify any actionable misstatement. Plaintiff points to forward-looking statements in TechCorp's earnings calls, but such statements are protected by the PSLRA's safe harbor provision.

> The Supreme Court has made clear that a plaintiff must prove that the defendant's misrepresentation was the **actual cause** of the investment loss.

[[CITATION:4]]

Moreover, the statements Plaintiff challenges are classic *corporate puffery*—vague expressions of optimism that no reasonable investor would rely upon. Courts consistently hold that general statements about a company's business prospects are not actionable. [[CITATION:5]]

### B. Plaintiff Fails to Adequately Plead Scienter

Even if Plaintiff had identified a material misstatement, the Complaint fails to plead scienter with the particularity required by the PSLRA. Plaintiff must allege facts giving rise to a "strong inference" of fraudulent intent—one that is:

- More than merely plausible or reasonable
- Cogent and compelling
- At least as compelling as any opposing inference of nonfraudulent intent

[[CITATION:6]]

The Complaint's allegations of scienter rest entirely on the fact that TechCorp's stock price declined after the company revised its revenue guidance. But stock price drops alone **do not establish scienter**.

---

## IV. CONCLUSION

For the foregoing reasons, Defendant respectfully requests that the Court grant this Motion to Dismiss and dismiss Plaintiff's Complaint with prejudice.`,
  citations: [
    {
      id: 'cit-1',
      text: 'Bell Atlantic Corp. v. Twombly, 550 U.S. 544, 570 (2007)',
      caseName: 'Bell Atlantic Corp. v. Twombly',
      reporter: '550 U.S. 544',
      pinCite: '570',
      year: 2007,
      position: { start: 407, end: 421 },
    },
    {
      id: 'cit-2',
      text: 'Ashcroft v. Iqbal, 556 U.S. 662, 678 (2009)',
      caseName: 'Ashcroft v. Iqbal',
      reporter: '556 U.S. 662',
      pinCite: '678',
      year: 2009,
      position: { start: 556, end: 570 },
    },
    {
      id: 'cit-3',
      text: "Henderson v. United States Dep't of Justice, 612 F.3d 1122, 1130 (9th Cir. 2010)",
      caseName: "Henderson v. United States Dep't of Justice",
      reporter: '612 F.3d 1122',
      pinCite: '1130',
      year: 2010,
      position: { start: 855, end: 869 },
    },
    {
      id: 'cit-4',
      text: 'Dura Pharmaceuticals, Inc. v. Broudo, 544 U.S. 336, 342 (2005)',
      caseName: 'Dura Pharmaceuticals, Inc. v. Broudo',
      reporter: '544 U.S. 336',
      pinCite: '342',
      year: 2005,
      position: { start: 1301, end: 1315 },
    },
    {
      id: 'cit-5',
      text: 'Basic Inc. v. Levinson, 485 U.S. 224, 231 (1988)',
      caseName: 'Basic Inc. v. Levinson',
      reporter: '485 U.S. 224',
      pinCite: '231',
      year: 1988,
      position: { start: 1551, end: 1565 },
    },
    {
      id: 'cit-6',
      text: 'Tellabs, Inc. v. Makor Issues & Rights, Ltd., 551 U.S. 308, 314 (2007)',
      caseName: 'Tellabs, Inc. v. Makor Issues & Rights, Ltd.',
      reporter: '551 U.S. 308',
      pinCite: '314',
      year: 2007,
      position: { start: 2050, end: 2064 },
    },
  ],
  verificationResults: [
    {
      id: 'ver-1',
      citationId: 'cit-1',
      status: 'valid',
      severity: 'none',
      message:
        'Citation verified. Case exists and the cited page contains the referenced "plausibility" standard for Rule 12(b)(6) motions.',
    },
    {
      id: 'ver-2',
      citationId: 'cit-2',
      status: 'quote_mismatch',
      severity: 'warning',
      message:
        'Quote does not match source. The brief\'s quotation differs materially from the original text in Iqbal.',
      details: {
        expectedQuote:
          'when the plaintiff pleads factual content that allows the court to draw the reasonable inference that the defendant is liable for the misconduct alleged',
        actualQuote:
          'A claim has facial plausibility when the plaintiff pleads factual content that allows the court to draw the reasonable inference that the defendant is liable for the misconduct alleged.',
      },
    },
    {
      id: 'ver-3',
      citationId: 'cit-3',
      status: 'not_found',
      severity: 'critical',
      message:
        'Citation not found. No case matching "Henderson v. United States Dep\'t of Justice" exists at 612 F.3d 1122. This citation may be fabricated.',
    },
    {
      id: 'ver-4',
      citationId: 'cit-4',
      status: 'valid',
      severity: 'none',
      message:
        'Citation verified. Dura Pharmaceuticals establishes loss causation requirements for securities fraud claims. Pin cite accurately references the relevant holding.',
    },
    {
      id: 'ver-5',
      citationId: 'cit-5',
      status: 'overruled',
      severity: 'warning',
      message:
        'Authority status: Partially overruled. The "fraud on the market" presumption from Basic Inc. was significantly limited by Halliburton Co. v. Erica P. John Fund, Inc., 573 U.S. 258 (2014).',
      details: {
        treatmentHistory:
          'Basic Inc. v. Levinson established the "fraud on the market" presumption of reliance. However, Halliburton II (2014) held that defendants may rebut this presumption at class certification by showing a lack of price impact. The core holding remains valid but has been substantially limited.',
      },
    },
    {
      id: 'ver-6',
      citationId: 'cit-6',
      status: 'valid',
      severity: 'none',
      message:
        'Citation verified. Tellabs establishes the "strong inference" standard for pleading scienter under the PSLRA. Pin cite correctly references the cogency requirement.',
    },
  ],
};

export const sampleBrief2: Brief = {
  id: 'brief-002',
  title: 'Motion for Summary Judgment - Contract Dispute',
  content: `# MEMORANDUM IN SUPPORT OF PLAINTIFF'S MOTION FOR SUMMARY JUDGMENT

## I. INTRODUCTION

Plaintiff DataSecure Inc. moves for summary judgment on its breach of contract claim against Defendant CloudHost LLC. The undisputed material facts demonstrate that CloudHost materially breached the Master Services Agreement by failing to maintain the required uptime guarantees and security standards.

## II. STATEMENT OF UNDISPUTED FACTS

The parties entered into a Master Services Agreement ("MSA") on January 15, 2023. The MSA required CloudHost to maintain 99.9% uptime and implement SOC 2 Type II compliance. [[CITATION:1]]

Between March 1, 2023 and June 30, 2023, CloudHost's services experienced downtime exceeding 48 hours, resulting in an uptime of only 98.2%. [[CITATION:2]]

## III. LEGAL STANDARD

Summary judgment is appropriate when "there is no genuine dispute as to any material fact and the movant is entitled to judgment as a matter of law." [[CITATION:3]]

For breach of contract claims, a plaintiff must establish: (1) the existence of a valid contract, (2) breach of that contract, and (3) damages resulting from the breach. [[CITATION:4]]

## IV. ARGUMENT

CloudHost's failure to meet the 99.9% uptime requirement constitutes a material breach of the MSA. The contract explicitly states that uptime below 99.9% triggers liquidated damages and termination rights. [[CITATION:5]]

Plaintiff is entitled to summary judgment because CloudHost cannot dispute the documented downtime records, which are maintained by independent third-party monitoring services.

## V. CONCLUSION

For the foregoing reasons, Plaintiff respectfully requests that the Court grant summary judgment in its favor.`,
  citations: [
    {
      id: 'cit-7',
      text: 'Restatement (Second) of Contracts § 235 (1981)',
      caseName: 'Restatement (Second) of Contracts',
      reporter: '§ 235',
      pinCite: undefined,
      year: 1981,
      position: { start: 450, end: 480 },
    },
    {
      id: 'cit-8',
      text: 'Anderson v. Liberty Lobby, Inc., 477 U.S. 242, 248 (1986)',
      caseName: 'Anderson v. Liberty Lobby, Inc.',
      reporter: '477 U.S. 242',
      pinCite: '248',
      year: 1986,
      position: { start: 650, end: 680 },
    },
    {
      id: 'cit-9',
      text: 'Celotex Corp. v. Catrett, 477 U.S. 317, 322 (1986)',
      caseName: 'Celotex Corp. v. Catrett',
      reporter: '477 U.S. 317',
      pinCite: '322',
      year: 1986,
      position: { start: 750, end: 780 },
    },
    {
      id: 'cit-10',
      text: 'First Nat\'l Bank v. Fidelity & Deposit Co., 545 F.2d 1160, 1167 (8th Cir. 1976)',
      caseName: 'First Nat\'l Bank v. Fidelity & Deposit Co.',
      reporter: '545 F.2d 1160',
      pinCite: '1167',
      year: 1976,
      position: { start: 900, end: 930 },
    },
    {
      id: 'cit-11',
      text: 'Hadley v. Baxendale, 9 Exch. 341, 354 (1854)',
      caseName: 'Hadley v. Baxendale',
      reporter: '9 Exch. 341',
      pinCite: '354',
      year: 1854,
      position: { start: 1100, end: 1130 },
    },
  ],
  verificationResults: [
    {
      id: 'ver-7',
      citationId: 'cit-7',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Restatement section accurately describes material breach doctrine.',
    },
    {
      id: 'ver-8',
      citationId: 'cit-8',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Anderson establishes the summary judgment standard.',
    },
    {
      id: 'ver-9',
      citationId: 'cit-9',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Celotex clarifies the movant\'s burden on summary judgment.',
    },
    {
      id: 'ver-10',
      citationId: 'cit-10',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Case correctly states elements of breach of contract claim.',
    },
    {
      id: 'ver-11',
      citationId: 'cit-11',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Hadley v. Baxendale establishes foreseeability requirement for damages.',
    },
  ],
};

export const sampleBrief3: Brief = {
  id: 'brief-003',
  title: 'Opposition to Motion to Compel Arbitration',
  content: `# MEMORANDUM IN OPPOSITION TO DEFENDANT'S MOTION TO COMPEL ARBITRATION

## I. INTRODUCTION

Defendant seeks to compel arbitration based on an arbitration clause in an employment agreement. However, the arbitration clause is unconscionable and unenforceable under California law. [[CITATION:1]]

## II. FACTUAL BACKGROUND

Plaintiff signed the employment agreement on her first day of work, under duress and without opportunity to negotiate terms. The agreement contains a mandatory arbitration clause that requires all disputes to be resolved through binding arbitration, waives class action rights, and requires employees to pay half of all arbitration costs. [[CITATION:2]]

## III. LEGAL STANDARD

Under California law, arbitration agreements are enforceable unless they are unconscionable. [[CITATION:3]] Unconscionability has both procedural and substantive components. [[CITATION:4]]

## IV. ARGUMENT

### A. The Arbitration Clause is Procedurally Unconscionable

The clause is procedurally unconscionable because it was presented as a "take it or leave it" adhesion contract with no opportunity to negotiate. [[CITATION:5]]

### B. The Arbitration Clause is Substantively Unconscionable

The cost-splitting provision and class action waiver render the clause substantively unconscionable. [[CITATION:6]] California courts have consistently held that requiring employees to bear arbitration costs creates an impermissible barrier to vindicating statutory rights.

## V. CONCLUSION

The arbitration clause is unconscionable and unenforceable. The Court should deny Defendant's motion to compel arbitration.`,
  citations: [
    {
      id: 'cit-12',
      text: 'Armendariz v. Foundation Health Psychcare Servs., Inc., 24 Cal. 4th 83, 99 Cal. Rptr. 2d 745 (2000)',
      caseName: 'Armendariz v. Foundation Health Psychcare Servs., Inc.',
      reporter: '24 Cal. 4th 83',
      pinCite: undefined,
      year: 2000,
      position: { start: 200, end: 250 },
    },
    {
      id: 'cit-13',
      text: 'Circuit City Stores, Inc. v. Adams, 279 F.3d 889, 892 (9th Cir. 2002)',
      caseName: 'Circuit City Stores, Inc. v. Adams',
      reporter: '279 F.3d 889',
      pinCite: '892',
      year: 2002,
      position: { start: 400, end: 450 },
    },
    {
      id: 'cit-14',
      text: 'AT&T Mobility LLC v. Concepcion, 563 U.S. 333, 339 (2011)',
      caseName: 'AT&T Mobility LLC v. Concepcion',
      reporter: '563 U.S. 333',
      pinCite: '339',
      year: 2011,
      position: { start: 600, end: 650 },
    },
    {
      id: 'cit-15',
      text: 'Pinnacle Museum Tower Ass\'n v. Pinnacle Mkt. Dev. (US), LLC, 55 Cal. 4th 223, 246 (2012)',
      caseName: 'Pinnacle Museum Tower Ass\'n v. Pinnacle Mkt. Dev. (US), LLC',
      reporter: '55 Cal. 4th 223',
      pinCite: '246',
      year: 2012,
      position: { start: 800, end: 850 },
    },
    {
      id: 'cit-16',
      text: 'Little v. Auto Stiegler, Inc., 29 Cal. 4th 1064, 1071 (2003)',
      caseName: 'Little v. Auto Stiegler, Inc.',
      reporter: '29 Cal. 4th 1064',
      pinCite: '1071',
      year: 2003,
      position: { start: 1000, end: 1050 },
    },
    {
      id: 'cit-17',
      text: 'Gentry v. Superior Court, 42 Cal. 4th 443, 457 (2007)',
      caseName: 'Gentry v. Superior Court',
      reporter: '42 Cal. 4th 443',
      pinCite: '457',
      year: 2007,
      position: { start: 1200, end: 1250 },
    },
  ],
  verificationResults: [
    {
      id: 'ver-12',
      citationId: 'cit-12',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Armendariz establishes California standards for employment arbitration agreements.',
    },
    {
      id: 'ver-13',
      citationId: 'cit-13',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Case discusses procedural unconscionability in employment contracts.',
    },
    {
      id: 'ver-14',
      citationId: 'cit-14',
      status: 'overruled',
      severity: 'warning',
      message: 'Authority status: Partially limited. Concepcion upheld class action waivers, but state law may still invalidate unconscionable cost-splitting provisions.',
      details: {
        treatmentHistory:
          'Concepcion held that the FAA preempts state laws that invalidate class action waivers. However, state unconscionability doctrines that do not specifically target arbitration remain valid.',
      },
    },
    {
      id: 'ver-15',
      citationId: 'cit-15',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Pinnacle discusses both procedural and substantive unconscionability.',
    },
    {
      id: 'ver-16',
      citationId: 'cit-16',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Little addresses cost-splitting provisions in arbitration agreements.',
    },
    {
      id: 'ver-17',
      citationId: 'cit-17',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Gentry discusses class action waivers in employment arbitration agreements.',
    },
  ],
};

export const sampleBrief4: Brief = {
  id: 'brief-004',
  title: 'Motion for Preliminary Injunction - Trade Secrets',
  content: `# MEMORANDUM IN SUPPORT OF PLAINTIFF'S MOTION FOR PRELIMINARY INJUNCTION

## I. INTRODUCTION

Plaintiff InnovateTech Solutions seeks a preliminary injunction to prevent Defendant and former employee John Smith from using or disclosing trade secrets misappropriated in violation of the Defend Trade Secrets Act ("DTSA") and California Uniform Trade Secrets Act ("CUTSA").

## II. FACTUAL BACKGROUND

Smith worked as a senior engineer at InnovateTech from 2020 to 2024, with access to proprietary algorithms and customer data. Upon his departure, Smith downloaded thousands of confidential files and immediately joined a direct competitor, TechRival Inc. [[CITATION:1]]

## III. LEGAL STANDARD

A preliminary injunction requires: (1) likelihood of success on the merits, (2) irreparable harm, (3) balance of equities, and (4) public interest. [[CITATION:2]]

## IV. ARGUMENT

### A. Likelihood of Success on the Merits

InnovateTech will likely succeed on its trade secret misappropriation claim. The evidence shows Smith downloaded confidential files and is now using them at TechRival. [[CITATION:3]]

### B. Irreparable Harm

Once trade secrets are disclosed, the harm cannot be undone. [[CITATION:4]] InnovateTech will suffer irreparable harm if Smith is allowed to continue using the misappropriated information.

### C. Balance of Equities and Public Interest

The balance of equities favors InnovateTech, and enforcing trade secret protection serves the public interest in innovation. [[CITATION:5]]

## V. CONCLUSION

The Court should grant the preliminary injunction to prevent further misappropriation of trade secrets.`,
  citations: [
    {
      id: 'cit-18',
      text: '18 U.S.C. § 1836(b)',
      caseName: 'Defend Trade Secrets Act',
      reporter: '18 U.S.C. § 1836',
      pinCite: 'b',
      year: 2016,
      position: { start: 300, end: 350 },
    },
    {
      id: 'cit-19',
      text: 'Winter v. Natural Resources Defense Council, Inc., 555 U.S. 7, 20 (2008)',
      caseName: 'Winter v. Natural Resources Defense Council, Inc.',
      reporter: '555 U.S. 7',
      pinCite: '20',
      year: 2008,
      position: { start: 500, end: 550 },
    },
    {
      id: 'cit-20',
      text: 'Cal. Civ. Code § 3426.1',
      caseName: 'California Uniform Trade Secrets Act',
      reporter: 'Cal. Civ. Code § 3426.1',
      pinCite: undefined,
      year: 1984,
      position: { start: 700, end: 750 },
    },
    {
      id: 'cit-21',
      text: 'Ruckelshaus v. Monsanto Co., 467 U.S. 986, 1011 (1984)',
      caseName: 'Ruckelshaus v. Monsanto Co.',
      reporter: '467 U.S. 986',
      pinCite: '1011',
      year: 1984,
      position: { start: 900, end: 950 },
    },
    {
      id: 'cit-22',
      text: 'Kewanee Oil Co. v. Bicron Corp., 416 U.S. 470, 493 (1974)',
      caseName: 'Kewanee Oil Co. v. Bicron Corp.',
      reporter: '416 U.S. 470',
      pinCite: '493',
      year: 1974,
      position: { start: 1100, end: 1150 },
    },
  ],
  verificationResults: [
    {
      id: 'ver-18',
      citationId: 'cit-18',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. DTSA provides federal cause of action for trade secret misappropriation.',
    },
    {
      id: 'ver-19',
      citationId: 'cit-19',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Winter establishes the four-factor test for preliminary injunctions.',
    },
    {
      id: 'ver-20',
      citationId: 'cit-20',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. CUTSA defines trade secrets under California law.',
    },
    {
      id: 'ver-21',
      citationId: 'cit-21',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Ruckelshaus discusses irreparable harm in trade secret cases.',
    },
    {
      id: 'ver-22',
      citationId: 'cit-22',
      status: 'valid',
      severity: 'none',
      message: 'Citation verified. Kewanee discusses public interest in trade secret protection.',
    },
  ],
};

export const allSampleBriefs: Brief[] = [
  sampleBrief,
  sampleBrief2,
  sampleBrief3,
  sampleBrief4,
];
