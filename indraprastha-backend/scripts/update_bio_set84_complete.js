const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 414,
    similarQuestion: {
      question: "India was amongst the first countries in the world to initiate nationwide action plans and programmes at a national level to achieve total reproductive health as a social goal. In which year were these 'Family Planning' programmes officially launched?",
      option_a: "1951",
      option_b: "1961",
      option_c: "1971",
      option_d: "1981",
      correct_option: "A",
      explanation: "India holds the distinction of being the first nation globally to initiate a nationwide Family Planning programme in 1951 to achieve population stabilization and reproductive health. These programmes were subsequently broadened and improved under the comprehensive banner of 'Reproductive and Child Health Care (RCH)' programmes. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 415,
    similarQuestion: {
      question: "A prenatal diagnostic procedure wherein a sample of amniotic fluid containing fetal cells is extracted from the uterus of a pregnant female to detect chromosomal aberrations, metabolic disorders, and fetal health is called:",
      option_a: "Laparoscopy",
      option_b: "Amniocentesis",
      option_c: "Chorionic villus sampling (CVS)",
      option_d: "Ultrasound fetoscopy",
      correct_option: "B",
      explanation: "Amniocentesis is a medical procedure in which a small volume of amniotic fluid containing desquamated fetal skin cells and biochemical markers is drawn from the amniotic sac surrounding the developing fetus. The cultured cells are karyotyped to diagnose chromosomal abnormalities (e.g., Down syndrome, Turner syndrome, Klinefelter syndrome) and metabolic defects. Because of its misuse for female foeticide, a statutory ban has been imposed on amniocentesis for fetal sex determination. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 417,
    similarQuestion: {
      question: "The novel oral contraceptive pill for females called 'Saheli' is a non-steroidal, 'once-a-week' preparation with very high contraceptive value and minimal side effects. At which prestigious Indian research institute was it developed?",
      option_a: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      option_b: "Central Drug Research Institute (CDRI), Lucknow",
      option_c: "National Institute of Immunology (NII), New Delhi",
      option_d: "Indian Council of Medical Research (ICMR), New Delhi",
      correct_option: "B",
      explanation: "'Saheli' is an innovative non-steroidal oral contraceptive formulation containing centchroman (ormeloxifene), which acts as a selective estrogen receptor modulator. It was developed by scientists at the Central Drug Research Institute (CDRI) located in Lucknow, Uttar Pradesh, India. Unlike conventional daily hormonal pills, Saheli is taken once a week after an initial twice-a-week regimen, offering high efficacy with negligible hormonal side effects. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 419,
    similarQuestion: {
      question: "Which method of contraception acts as a physical barrier that prevents deposition of ejaculated semen into the female reproductive tract and simultaneously provides crucial protection against transmitting Sexually Transmitted Infections (STIs), including Hepatitis-B and AIDS?",
      option_a: "Diaphragms",
      option_b: "Copper-releasing IUDs",
      option_c: "Condoms (male and female sheaths)",
      option_d: "Hormonal implants",
      correct_option: "C",
      explanation: "Condoms (such as 'Nirodh' for males and femidoms for females) are thin sheaths of rubber or latex that cover the penis or line the vagina and cervix. They prevent the deposition of semen into the female genital tract, thereby preventing fertilization. Crucially, condoms are the only contraceptive method that provides dual protection: preventing unwanted conception while effectively shielding both partners against sexually transmitted infections (STIs) and HIV/AIDS. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 420,
    similarQuestion: {
      question: "Barrier methods of contraception prevent fertilization by physically obstructing the entry of viable spermatozoa into the cervix. Which of the following groups includes only barrier contraceptives?",
      option_a: "Condoms, Vaults, CuT, and Progestasert",
      option_b: "Lippes loop, Diaphragm, Implants, and LNG-20",
      option_c: "Condoms, Diaphragms, Cervical caps, and Vaults",
      option_d: "Tubectomy, Vasectomy, Condoms, and Mala-D",
      correct_option: "C",
      explanation: "Barrier contraceptives work by physically blocking sperm transit to prevent meeting between ovum and sperm. Condoms (used by both males and females) and diaphragms, cervical caps, and vaults (made of rubber and inserted into the female reproductive tract to cover the cervix before coitus) are all classified as mechanical/physical barrier methods. CuT, Lippes loop, and LNG-20 are IUDs, while Mala-D is an oral pill. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 421,
    similarQuestion: {
      question: "Intrauterine Devices (IUDs) are broadly classified into non-medicated, copper-releasing, and hormone-releasing varieties. Which category do Progestasert and LNG-20 belong to, and how do they function?",
      option_a: "Copper-releasing IUDs that suppress sperm motility",
      option_b: "Non-medicated IUDs that increase phagocytosis of sperms",
      option_c: "Hormone-releasing IUDs that render the uterus unsuitable for implantation and make cervical mucus hostile to sperms",
      option_d: "Subcutaneous steroid implants that prevent ovulation",
      correct_option: "C",
      explanation: "Progestasert and LNG-20 (levonorgestrel-releasing IUD) are hormone-releasing IUDs. They continuously release low levels of progestogen into the uterine cavity, which increases the viscosity of cervical mucus (preventing sperm ascent), renders the endometrium structurally unsuitable for blastocyst implantation, and mildly suppresses ovulation. CuT and Multiload 375 are copper-releasing, and Lippes loop is non-medicated. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 422,
    similarQuestion: {
      question: "Conventional combined oral contraceptive pills (such as Mala-D) taken daily by females for 21 days contain synthetic derivatives of which essential ovarian hormones to prevent unintended pregnancy?",
      option_a: "Progestogen alone or in combination with estrogen",
      option_b: "Luteinizing hormone (LH) and Follicle-stimulating hormone (FSH)",
      option_c: "Oxytocin and Prolactin",
      option_d: "Human chorionic gonadotropin (hCG) and Relaxin",
      correct_option: "A",
      explanation: "Oral contraceptive pills contain either progestogen alone (mini-pills) or, more commonly, a combination of synthetic progestogen and estrogen (combined oral contraceptives). By maintaining steadily elevated systemic levels of progestogen and estrogen, these pills exert negative feedback on the hypothalamus and anterior pituitary, inhibiting the release of GnRH, FSH, and LH. This suppresses follicle development and completely blocks the mid-cycle LH surge, thereby preventing ovulation. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 423,
    similarQuestion: {
      question: "An advanced specialized Assisted Reproductive Technology (ART) procedure employed in cases of severe oligospermia or asthenospermia, in which a single selected viable spermatozoon is directly injected into the cytoplasm of a mature ovum in vitro, is termed:",
      option_a: "Intrauterine Insemination (IUI)",
      option_b: "Intra Cytoplasmic Sperm Injection (ICSI)",
      option_c: "Gamete Intra Fallopian Transfer (GIFT)",
      option_d: "Zygote Intra Fallopian Transfer (ZIFT)",
      correct_option: "B",
      explanation: "Intra Cytoplasmic Sperm Injection (ICSI) is a specialized micromanipulation in vitro technique in which an embryologist uses a microscopic microneedle to hold an ovum and directly inject a single viable sperm into the ooplasm (cytoplasm) of the egg. This technique is particularly effective for overcoming severe male factor infertility (such as very low sperm count or poor motility) where natural in vitro penetration of the zona pellucida is not achieved. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 424,
    similarQuestion: {
      question: "In the 'Test-tube Baby' (In Vitro Fertilization and Embryo Transfer) programme, if an in vitro formed zygote or early cleavage embryo containing up to 8 blastomeres is transferred into the fallopian tube of the surrogate or biological mother, the technique is specifically known as:",
      option_a: "Intra Uterine Transfer (IUT)",
      option_b: "Zygote Intra Fallopian Transfer (ZIFT)",
      option_c: "Gamete Intra Fallopian Transfer (GIFT)",
      option_d: "Intra Cytoplasmic Sperm Injection (ICSI)",
      correct_option: "B",
      explanation: "In IVF-ET protocols, fertilization of ovum by sperm is achieved outside the body in laboratory conditions. Following fertilization, the resulting zygote or early embryo at the cleavage stage (up to 8 blastomeres) is surgically or transcervically transferred into the fallopian tube, a technique termed Zygote Intra Fallopian Transfer (ZIFT). If embryos with more than 8 blastomeres are transferred directly into the uterine cavity, it is termed Intra Uterine Transfer (IUT). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 425,
    similarQuestion: {
      question: "The widely known 'Test-tube Baby' programme involves in vitro fertilization (IVF) followed by Embryo Transfer (ET). Depending on the developmental cleavage stage of the embryo, which of the following transfer techniques is appropriately chosen?",
      option_a: "GIFT for transfer of unfertilized gametes into the cervix",
      option_b: "ZIFT (up to 8 blastomeres into fallopian tube) or IUT (more than 8 blastomeres into uterus)",
      option_c: "Artificial insemination of ova directly into ovarian follicles",
      option_d: "Direct surgical transfer of blastocysts into the peritoneal cavity",
      correct_option: "B",
      explanation: "In the test-tube baby programme, in vitro fertilization (IVF) produces embryos outside the maternal body. When embryo transfer (ET) is performed, embryos with up to 8 blastomeres are transferred into the fallopian tube (ZIFT, Zygote Intra Fallopian Transfer), while advanced embryos with more than 8 blastomeres are transferred directly into the uterine cavity (IUT, Intra Uterine Transfer) for subsequent implantation and gestation. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 426,
    similarQuestion: {
      question: "In assisted reproduction, the technique termed Artificial Insemination (AI) specifically refers to:",
      option_a: "Direct surgical injection of sperm cells into the Graafian follicle inside the ovary",
      option_b: "Artificial introduction of semen collected from the husband or a healthy donor into the vagina or uterus (IUI) of the female",
      option_c: "In vitro mixing of harvested ova and sperms in a culture petri dish",
      option_d: "Implantation of early blastocysts into the fallopian tube",
      correct_option: "B",
      explanation: "Artificial Insemination (AI) is an assisted reproductive technique applied when the male partner is unable to inseminate the female due to erectile dysfunction or very low sperm count (oligospermia). In this procedure, semen collected either from the husband or an anonymous healthy donor is artificially introduced into the vagina or directly into the uterine cavity (Intrauterine Insemination, IUI) around the time of ovulation. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 427,
    similarQuestion: {
      question: "Which of the following statements regarding Sexually Transmitted Infections (STIs) and reproductive pathology is correct?",
      option_a: "The probability of a 5-year-old child contracting a sexually transmitted infection through ordinary social contact is virtually negligible",
      option_b: "Syphilis and gonorrhea can easily be contracted by sharing food or drinking water with an infected person",
      option_c: "Haemophilia and sickle-cell anaemia are classical viral sexually transmitted infections",
      option_d: "All STIs are entirely incurable even if detected at early stages",
      correct_option: "A",
      explanation: "Sexually Transmitted Infections (STIs, e.g., gonorrhea, syphilis, chlamydiasis, genital herpes, hepatitis-B, HIV) are transmitted almost exclusively through sexual contact with an infected partner, or rarely via contaminated blood transfusion or vertical transmission from mother to foetus. They cannot be contracted through casual everyday contact such as hugging, sharing meals, or social interaction, meaning a 5-year-old child has virtually zero risk under ordinary conditions. Haemophilia and sickle-cell anaemia are genetic disorders, not STIs. Most bacterial STIs are completely curable if diagnosed and treated early. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 432,
    similarQuestion: {
      question: "According to reproductive health guidelines, which combination of characteristics defines an 'ideal contraceptive' for birth control?\n(I) It should be user-friendly and convenient to use.\n(II) It should be easily accessible and affordable.\n(III) It should be effective and completely reversible.\n(IV) It should cause no or minimal adverse physiological side-effects.\n(V) It must significantly diminish sexual desire and interfere with sexual drive.",
      option_a: "I, II, III, and IV only",
      option_b: "I, II, and V only",
      option_c: "II, III, and V only",
      option_d: "All statements I, II, III, IV, and V",
      correct_option: "A",
      explanation: "According to NCERT Reproductive Health, an ideal contraceptive must satisfy specific criteria: it should be user-friendly, easily available, highly effective, completely reversible with no or minimal side effects, and crucially, it must NOT interfere with the sexual drive, desire, or the sexual act of the user. Thus, statements (I), (II), (III), and (IV) are true, while statement (V) is incorrect. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 435,
    similarQuestion: {
      question: "Read the following statements regarding contraception and demographic trends:\n(I) Tubectomy aims to surgically block gamete transport, not to inhibit oogenesis or egg formation.\n(II) Progestogens (alone or combined with estrogen) form the core active components of oral contraceptive pills.\n(III) Oral contraceptive pills prevent conception primarily by suppressing ovulation and thickening cervical mucus.\n(IV) Successful implementation of RCH programmes in India has led to a notable decline in both Infant Mortality Rate (IMR) and Maternal Mortality Rate (MMR).\nWhich of the above statements are correct?",
      option_a: "I, II, and III only",
      option_b: "I, II, III, and IV",
      option_c: "II, III, and IV only",
      option_d: "I and IV only",
      correct_option: "B",
      explanation: "All four statements are correct based on NCERT: (I) Tubectomy is a terminal surgical sterilisation method that severs and ties fallopian tubes to block gamete transport, while the ovaries continue normal follicular development and ovulation; (II) Oral contraceptive pills contain synthetic progestogen or progestogen-estrogen combinations; (III) These pills act by inhibiting ovulation through negative feedback on gonadotropins and altering cervical mucus to impede sperm entry; (IV) Better healthcare facilities and RCH initiatives have significantly reduced both maternal mortality rate (MMR) and infant mortality rate (IMR). Therefore, statements I, II, III, and IV are all correct. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 438,
    similarQuestion: {
      question: "To build a socially conscious, reproductively healthy society, which of the following measures should be actively promoted by health agencies and educational bodies?\n(1) Introducing scientifically accurate sex education in schools to dispel myths and misconceptions.\n(2) Creating widespread awareness about birth control options, prenatal care, and STD prevention.\n(3) Enforcing a strict statutory legal ban on amniocentesis for prenatal sex determination.\n(4) Expanding accessible medical facilities and healthcare infrastructure for reproductive problems.\n(5) Promoting superstitions and social taboos surrounding reproductive anatomy.",
      option_a: "(1), (2), (3), and (4) only",
      option_b: "(1), (2), and (5) only",
      option_c: "(2), (3), and (5) only",
      option_d: "All (1), (2), (3), (4), and (5)",
      correct_option: "A",
      explanation: "Building a reproductively healthy society requires providing factual sex education in schools, dispelling myths and taboos, educating adolescents on hygiene and contraception, ensuring access to quality medical care for STIs, maternal healthcare, and child immunization, and enforcing legal bans on prenatal sex determination to stop female foeticide. Encouraging superstitions or taboos (5) is detrimental to reproductive health. Hence, measures (1), (2), (3), and (4) should be actively implemented. Therefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in successfully.');

  let success = 0;
  for (const q of questions) {
    const res = await fetch(`${API_URL}/admin/practice-questions/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: q.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated Set 84 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Set 84 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
