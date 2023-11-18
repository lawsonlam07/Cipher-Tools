const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const ciphertext = "ONSXP YGXSQ LJISB NTNNQ ZXEJQ HZURU QZSRZ PYYPJ ZIZUS YLINX YUPNG UMMUC AVWAN YZJUQ YSTUA ZZINU VNXSZ JUQUG ZINBS AMZTA ZJISB NTNNQ AQSTM NZUHN ZIUMO UGINX SQOJS PIUVJ QHEUA PSETN STMNZ UINMV INXNP SJMJY YNZZU SQUAZ UGUGG JRNXN VMESQ OYINI SYSVV SXNQZ MEZSL NQSGN COSEY MNSBN QUUQN SZZIN TSQLY NNPYZ ULQUC CINXN YINIS YHUQN SQOZI NXNCS YQUSQ YCNXC INQJZ XJNOZ UBJYJ ZINXS ZIUPN INXPU TJMNJ YSMYU SVVSX NQZME UGGMJ QNTAZ JSVVX NRJSZ NZISZ ZINYJ HQSMS XUAQO RAMVN VNXRS QTNBN XEVUU XYUZI SZJYV NXISV YQUZY JHQJG JRSQZ JGEUA ISBNS QEJON SCINX NYINP JHIZT NZINQ VMNSY NOUMN ZPNLQ UCJGQ UZZIN QVNXI SVYEU ARSQS QYCNX YUPNW ANYZJ UQYGU XPNZI NBSAM ZXNHJ YZNXZ NMMYP NZINO SZNYU QCIJR INSRI TUDJY SRRNY YNOSQ OBJYJ ZUXYY JHQJQ SQOUA ZTAZQ UZJPN YSXNH JBNQJ YZINX NSXNS YUQGU XZISZ IUCMU QHOUR MJNQZ YZEVJ RSMME YVNQO JQZIN BSAMZ SQOSX NZINE AYASM MEMNG ZSMUQ NZINO NVUYJ ZTUDN YCJZI JQZIN BSAMZ SXNNS RIMUR LNOCJ ZIZIN JXUCQ LNESQ OJAQO NXYZS QOZIS ZZINL NEYSX NINMO JQSQQ SYUGG JRNCI UNMYN ISYSR RNYYZ UZIUY NLNEY YUPNR MJNQZ YYNNP ZUISB NSRRN YYZUP UXNZI SQUQN TUDJY ZISZR UPPUQ ZINXN SXNYN BNQIA QOXNO SQOYJ DZEZI XNNTU DNYJQ ZINBS AMZTA ZZINY MJONY UQZIN GJXYZ GUXZE ZIXNN UGZIN PSXNR MNSXM EPUXN CUXQZ ISQZI NUZIN XYSQO SMZIU AHIJC SYUQM EHJBN QYJHI ZUGZI NMSYZ GNCPU QZIYX NRUXO YJQUZ JRNOZ ISZQU TUDQA PTNXN OIJHI NXZIS QGUXZ EJYMJ YZNOU QZINB SAMZS RRNYY XNHJY ZNXJY ZIJYS RUJQR JONQR NSQOR SQZIN XNMSZ JUQYI JVTNZ CNNQZ INSRR NYYOS ZNSQO ZINTU DQAPT NXZIS ZSVVN SXYUQ ZINYN XNRNQ ZXNRU XOYXN SMMET NSRUJ QRJON QRNJI SOZIU AHIZZ ISZZI NRIJQ NYNRI SXSRZ NXYPJ HIZNQ RUONT UDQAP TNXYT AZYJQ RNZIN XNSXN UQMEQ JQNTJ QSXER ISXSR ZNXYU QNSRI TUDMJ QJQHZ IJYCU AMOUQ MENQR UONSP SDJPA PUGGJ BNIAQ OXNOS QOZCN MBNOJ GGNXN QZTUD QAPTN XYJYZ ISZQA PTNXY JHQJG JRSQZ ZUZIN TSQLJ QYUPN UZINX CSEZI NPUYZ RUPPU QNQZX EJQZI NBSAM ZXNHJ YZNXJ YZINQ SPNZS MMPSO HNOUE UAISB NRUQZ SRZON ZSJMY GUXZI JYVNX YUQIS BNEUA RUPNS RXUYY ZINPT NGUXN OUZIN EISBN SQERU QQNRZ JUQCJ ZISQQ SYPJZ IUQNG JQSMZ IJQHJ CUAMO MJLNZ UTXJQ HJQSR UQYAM ZSQZZ UCUXL CJZIP NUQZI JYVXU KNRZI JYQSP NJYIS XXESQ OJZIJ QLIJY YLJMM YCJMM TNAYN GAMJC JMMVS EIJPG XUPZI NGNNE UASMX NSOES HXNNO ZUVSE PNTAZ INJYR AXXNQ ZMEYZ SEJQH JQPEI UZNMS QOJGE UASHX NNZUS OOIJP ZUZIN JQBNY ZJHSZ JUQZI NQJCU AMOMJ LNEUA ZUZSL NUQIJ YTJMM CIJMN JSPQU ZENZS QDJUA YSTUA ZSQQS YCINX NSTUA ZYJCU AMOMJ LNZUL QUCSY YUUQS YYINX NYAXG SRNYS QOPEW ANXJN YSTUB NSXNW AJZNA XHNQZ SQOND ZXNPN MERUQ GJONQ ZJSMJ CUAMO TNHXS ZNGAM JGEUA RUAMO XNVME SZEUA XBNXE NSXMJ NYZRU QBNQJ NQRNS QOAYJ QHSBJ HNQNX NRJVI NXZUN QYAXN YNRXN REEUA XYKR"
const randomQuotes = ["Making things up...", "Why couldn't you have done this yourself...", "Deleting half of the text...", "Fun fact: There are 26 letters in the English alphabet!", "I'd rather be doing anything else than be solving your stupid cipher.", "If you are reading this, get back to work."];
const quoteLen = randomQuotes.length;
let solution = "";
let solutions = [[], []];
let limit = 10
let n = 0;

function fitness(arr) {
	let total = 0;
	for (let i = 0; i < arr.length - 2; i++) {
		total += trigrams[arr.slice(i, i + 3).join("")];
	}
	return total;
}

function findBest(arr) {
	return arr[1].indexOf(Math.max(...arr[1]));
}

function step() {
	let stability = 0;
	while (stability !== 75) {
		fitnessArr = [[], []];
		let randChar = alpha[Math.floor(Math.random() * alpha.length)];
		for (let char of alpha) {
			let buffer = cipherTest.replaceAll(randChar, "-");
			buffer = buffer.replaceAll(char, randChar);
			buffer = buffer.replaceAll("-", char);
			fitnessArr[0].push(buffer);
			fitnessArr[1].push(fitness(buffer.split("")));
		}

		best = findBest(fitnessArr);
		if (fitnessArr[0][best] === cipherTest) {
			stability += 1;
		} else {
			stability = 0;
		}

		cipherTest = fitnessArr[0][best];
	}
	return [cipherTest, fitnessArr[1][best]]
}

function solve() {
	cipherFilter = Array.from(ciphertext).filter(v => alpha.includes(v)).join("");
	
	cipherTest = cipherFilter;
	let possibility = step();
	solutions[0].push(possibility[0]);
	solutions[1].push(possibility[1]);

	plaintext = solutions[0][findBest(solutions)];
	console.log(plaintext);
}

function getKey() {
	let cipherKey = Array.from(new Set(cipherFilter));
	cipherKey.push(...alpha.filter(v => !cipherKey.includes(v)));
	
	let plainKey = Array.from(new Set(plaintext));
	plainKey.push(...alpha.filter(v => !plainKey.includes(v)));

	let key = {};
	for (let i = 0; i < 26; i++) {
		key[cipherKey[i]] = plainKey[i];
	}
	key = Object.entries(key).sort((a, b) => a[0].localeCompare(b[0]));
	
	return key;
}

function copyPlaintext() {
  let decrypt = document.createElement("textarea");
  document.body.appendChild(decrypt);
  decrypt.value = plaintext;
  decrypt.select();
  document.execCommand("copy");
  decrypt.remove();
}

function setup() {
	textAlign(CENTER);
	buttons = {
    input: createInput(),
    copy: createButton("Copy"),
    auto: createButton("Auto-Solve")
  }
}

function draw() {
	positions = {
    input: [windowWidth/2, windowHeight/100],
    copy: [windowWidth/100, windowHeight*(3.5/6)],
    auto: [windowWidth/100, windowHeight*(4.75/6)]
  }
  sizes = {
    input: [windowWidth*(47/100), 20],
    copy: [windowWidth*(3/10), windowHeight*(1/6)],
    auto: [windowWidth*(3/10), windowHeight*(1/6)]
  }
	createCanvas(windowWidth-10, windowHeight-10);
  for (let v in buttons) {
    buttons[v].position(positions[v][0], positions[v][1]);
    buttons[v].size(sizes[v][0], sizes[v][1]);
    if (v != "input") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`);
      buttons[v].style("border-radius", "10px");
			buttons[v].style("background-color", "rgb(57,57,57)");
			buttons[v].style("color", "rgb(174,174,174)");
			buttons[v].style("text-shadow", "-2px -2px rgb(0,0,0)");

    }
  }	
	background(50);
	fill(100);
	let loading = [windowWidth/100, windowWidth/100, windowWidth*(29/100), windowHeight/10];
	rect(...loading);
	fill(158, 235, 52);
	rect(loading[0]+5, loading[1]+5, (loading[2]-10)*(n/limit), loading[3]-10);
	fill(150);
	line(windowWidth*(31/100), 0, windowWidth*(31/100), windowHeight);
	
	if (n < limit) {
		let quote = randomQuotes[Math.floor(Math.random()*quoteLen)]
		text(quote, 0, windowHeight*(1.5/10), windowWidth*(20/100), windowHeight/10)
		solve();
		n++;
	} else {
		let key = getKey();
		let plainKey = [];
		let cipherKey = [];
		
		for (i = 0; i < 26; i++) {
			plainKey.push(key[i][0]);
			cipherKey.push(key[i][1]);
		}
		key = plainKey.join("") + "\n" + cipherKey.join("")
		text(key, 0, windowHeight*(1.5/10), windowWidth*(20/100), windowHeight/10)
	}
}
