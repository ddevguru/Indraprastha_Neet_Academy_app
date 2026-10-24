const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 485,
    similarQuestion: {
      question: "The enlarged terminal end of the human penis, known as the glans penis, is covered by a retractable loose fold of skin termed the:",
      option_a: "Prepuce (foreskin)",
      option_b: "Corpus spongiosum",
      option_c: "Scrotal sac",
      option_d: "Epididymal tunic",
      correct_option: "A",
      explanation: "The distal expanded portion of the human penis is the glans penis, which is shielded by a loose, sensitive, retractable fold of skin called the prepuce or foreskin. Surgical removal of the prepuce is known as circumcision. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 486,
    similarQuestion: {
      question: "In the human male reproductive system, which duct originates from the urinary bladder, traverses through the prostate gland and penis, and serves as a shared conduit for both urine and semen?",
      option_a: "Ureter",
      option_b: "Vas deferens",
      option_c: "Urethra",
      option_d: "Epididymis",
      correct_option: "C",
      explanation: "In human males, the urethra originates from the neck of the urinary bladder, passes through the prostate gland and the penis, and terminates at the external urethral orifice (urethral meatus). It functions as a common urogenital duct transmitting both urine during excretion and semen during ejaculation. Ureters transport urine from the kidneys to the urinary bladder. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 487,
    similarQuestion: {
      question: "The hollow, thick-walled, inverted pear-shaped muscular organ supported by pelvic ligaments in the female reproductive system where the developing embryo implants and gestates is the:",
      option_a: "Fallopian tube (oviduct)",
      option_b: "Uterus (womb)",
      option_c: "Cervical canal",
      option_d: "Vaginal vault",
      correct_option: "B",
      explanation: "The uterus (also known as the womb) is a single, hollow, thick-walled, inverted pear-shaped muscular organ located in the female pelvic cavity between the bladder and rectum. It consists of an outer perimetrium, thick middle smooth muscular myometrium, and inner glandular endometrium where the blastocyst implants and undergoes development until birth. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 488,
    similarQuestion: {
      question: "During human spermatogenesis, which diploid cells lining the inner wall of the seminiferous tubules undergo mitotic multiplication to ultimately generate spermatozoa?",
      option_a: "Sertoli cells",
      option_b: "Leydig interstitial cells",
      option_c: "Spermatogonia (male germ cells)",
      option_d: "Secondary spermatocytes",
      correct_option: "C",
      explanation: "The inner lining of the seminiferous tubules contains immature male germ cells called spermatogonia (diploid, 2n = 46 chromosomes). Spermatogonia divide mitotically to produce primary spermatocytes, which then undergo meiotic divisions to form haploid spermatids and ultimately spermatozoa. Sertoli cells provide nourishment and regulatory signals, while Leydig cells secrete testosterone. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 489,
    similarQuestion: {
      question: "The morphological metamorphosis of non-motile, circular, haploid spermatids into elongated, flagellated, motile spermatozoa is specifically known as:",
      option_a: "Spermiation",
      option_b: "Spermiogenesis",
      option_c: "Spermatocytogenesis",
      option_d: "Capacitation",
      correct_option: "B",
      explanation: "The process of transformation of non-motile haploid spermatids into mature, structurally specialized, flagellated spermatozoa is known as spermiogenesis. Following spermiogenesis, sperm heads become embedded in the Sertoli cells and are eventually released from the seminiferous tubules into the lumen by the process called spermiation. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 7123,
    similarQuestion: {
      question: "During human fertilisation, the fusion of two haploid gametes restores the diploid chromosome number. Which of the following is formed immediately after this fusion?",
      option_a: "Gastrula",
      option_b: "Zygote",
      option_c: "Blastocyst",
      option_d: "Morula",
      correct_option: "B",
      explanation: "During fertilisation, the haploid nucleus of the sperm (n = 23) fuses with the haploid nucleus of the ovum (n = 23) in the ampullary region of the fallopian tube, a process called syngamy. This union immediately forms a single-celled diploid zygote (2n = 46), restoring the species-specific chromosome complement. The zygote subsequently undergoes cleavage divisions to form the morula and blastocyst. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 7125,
    similarQuestion: {
      question: "During pregnancy, placental hormones bring about several changes in the maternal body. Consider the following statements:\n(i) They help maintain pregnancy.\n(ii) They support foetal growth and development.\n(iii) They help bring about metabolic changes in the mother.\n(iv) They directly initiate menstruation throughout pregnancy.\nWhich of the statements are correct?",
      option_a: "(i), (ii), (iii)",
      option_b: "(ii), (iii) and (iv) only",
      option_c: "(i), (ii) and (iii) only",
      option_d: "(i) and (iv) only",
      correct_option: "A",
      explanation: "The placenta acts as an endocrine tissue, secreting hormones including hCG, hPL, estrogens, and progestogens. These hormones are essential for maintaining pregnancy, facilitating maternal metabolic adaptations to supply glucose and amino acids to the fetus, and promoting fetal growth. Menstruation is inhibited during pregnancy by high levels of progesterone and estrogen. Thus, statements (i), (ii), and (iii) are correct, while statement (iv) is incorrect. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 7126,
    similarQuestion: {
      question: "Arrange the following hormonal and ovarian events in the correct sequence during the human female reproductive cycle.\nI. Formation of corpus luteum\nII. Increase in estrogen secretion by developing follicles\nIII. LH surge\nIV. Release of the secondary oocyte\nV. Stimulation of ovarian follicles by FSH",
      option_a: "III → V → II → IV → I",
      option_b: "V → III → II → I → IV",
      option_c: "II → V → IV → III → I",
      option_d: "V → II → III → IV → I",
      correct_option: "D",
      explanation: "The sequence of events in the human menstrual cycle is: (V) Anterior pituitary secretes FSH, stimulating primary follicles to grow; (II) Maturing follicles secrete rising levels of estrogen; (III) Rapid rise in LH around day 14 induces the LH surge; (IV) The LH surge induces the rupture of the Graafian follicle and release of the secondary oocyte (ovulation); (I) The remnant luteal tissue differentiates into the corpus luteum, which secretes progesterone. Thus, the correct sequence is V → II → III → IV → I. Therefore, Option (D) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('Logged in successfully, token received.');

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
      console.log(`[SUCCESS] Updated question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}: ${err}`);
    }
  }
  console.log(`Set 83 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
