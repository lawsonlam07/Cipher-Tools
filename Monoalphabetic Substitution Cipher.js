const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const ciphertext = "RDLLW NRDGA MVHLN ROSHJ WHVNR OJYGA OLNHG LOJHL NYVHP GCDGY COGNY SDBVY BOYGH PLDLS RYQOM IPNYN TDMDG YGNOL SOJNV LHFNR ONOBO ELDJR DGCRD CGNIO OGJYS AOCPJ IWNRO JHBYS OMHYN TDMGH NYGNR OVYBO MYRDC IHLLH TOCVL HFNRO FYVHB BHTOC PJHGN ROIHH AMRHJ BODCI PNCYC GNEON VDLDB NRHPE RSPLY HPMBW DBLOM VHLCR DMIOO GDJBD SOHVY GNOLO MNNHN ROYGN OBBYE OGSOM OLQYS OVHLD TRYBO NROYG VDFHP MJHLN BDGCM JWLYG EPMOC NROJP IBYSB DQDNH LWHQO LNROL HDCVL HFNRO BHSDB JHBYS OMNDN YHGNR OLODM DCODC CLHJT RYSRM OOFMQ OLWPG BYAOB WIPNY EPOMM NRDNT DMNRO JHYGN DGWTD WNRDN RDMGH NRYGE NHCHT YNRNR OSDMO TODLO YGQOM NYEDN YGERO LOYED NROLV LHFNR OVYBO MNRDN MHHGD VNOLF YMMMN WBOML OSOYQ OCNRO JYGAO LNHGL OJHLN MROTD MDIBO NHJOL MPDCO NROJH BYSON HLOHJ OGNRO SDMON ROWCH GNMOO FNHRD QOIOO GJDLN YSPBD LBWCY BYEOG NHLAO OGRDL JOLTL HNODF OFHSR DMNYM YGENR OFVHL NROYL BDSAH VJLHE LOMMJ OLRDJ MNHYF JLOMM RYMVL YOGCL HEOLM IPNNR OCONO SNYQO YGSRD LEOLO JBYOC TYNRD BHGEB YMNHV LODMH GMTRW NROSD MOTDM RHJOB OMMRD LJOLM CYDLW MRHTM NRDND JBDGG OCFOO NYGEN HCYMS PMMNR OSDMO TDMSD GSOBB OCMHH GDVNO LROLO SOYQO CNROL OJBWN ROTRH BONRY GETHP BCRDQ OIOOG OGNYL OBWVH LEHNN OGIWG HTYVF DYMYO RDCGH NTLYN NOGDE DYGNH NROJH BYSOS RYOVT YNRDG OUNLD HLCYG DLWSB DYFNR OOGSL WJNOC GHNON RDNCL TRYNO RDCVH PGCMO TGYGN HNROI YGCYG EHVNR OIHHA CYMJB DWOCM OQOLD BVODN PLOMN RDNMP EEOMN OCYNR DCIOO GTLYN NOGHG NRONW JOTLY NOLYG NROFD GMYHG YNMOB VNHFR DLJOL TDMMS OJNYS DBDMN RONWJ OVDSO DJJOD LOCNH IODMN DGCDL CPGCO LTHHC NWJYS DBHVR PGCLO CMHVN WJOTL YNOLM YGNRO MNDNO IPNYN TDMNL PONRD NNROB ONNOL ZMRHT OCDCY MNYGS NYQOC YJDGC NRDNN ROBON NOLDT DMFYM MYGEY NMPJJ OLMOL YVYGN ROGHN OIHNR VODNP LOMMO OGYGH NROLC HSPFO GNMNW JOCHG NRORH PMOFD SRYGO RDLJO LTDMS BODLB WCYMN PLIOC IWNRO CYMSH QOLWR YMCDY BWBHE GHNOC NROVY GCYGE MTYNR NROLO FDLAM YVNRO GHNOT DMTLY NNOGI WMHFO HGOYG NRORH PMORH BCNRO GCHOM NRDNF ODGNR DNNRO WTOLO YGBOD EPOTY NRYMB OMHLN RDNNR OWTOL OMHFO RHTYG QHBQO CTYNR RYFTR WCYCR OSRHH MONRD NJDLN YSPBD LIHHA ROMOG NDBON NOLNH LHEOL MDMAY GERYF YVROS HPBCD SSHPG NVHLN ROCYM SHQOL WDGCL OSOYQ OCNRO DNNDS ROCLO JBWTO SDGZP CEOZP MNRHT LDNNB OCLHE OLMVO BNIWN ROVDS NNRDN ROOGS LWJNO CYNPM YGEDQ YEOGO LOSYJ ROLRO SBODL BWCYC GHNTD GNNHN DAODS RDGSO NRDND GWHGO HNROL NRDGR DLJOL THPBC LODCY N".toUpperCase();
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
	let cipherFilter = Array.from(ciphertext).filter(v => alpha.includes(v)).join("");
	
	cipherTest = cipherFilter;
	let possibility = step();
	solutions[0].push(possibility[0]);
	solutions[1].push(possibility[1]);

	plaintext = solutions[0][findBest(solutions)];
	console.log(plaintext);
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
	buttons = {
    input: createInput(),
    copy: createButton("Copy"),
    auto: createButton("Auto-Solve")
  }
}

function draw() {
	positions = {
    input: [windowWidth/2, windowHeight/100],
    copy: [windowWidth/100, windowHeight*(4.1/6)],
    auto: [windowWidth/100, windowHeight*(5.1/6)]
  }
  sizes = {
    input: [windowWidth*(47/100), 20],
    copy: [windowWidth*(30/100), windowHeight*(1/7)],
    auto: [windowWidth*(30/100), windowHeight*(1/7)]
  }
	createCanvas(windowWidth-10, windowHeight-10);
  for (let v in buttons) {
    buttons[v].position(positions[v][0], positions[v][1]);
    buttons[v].size(sizes[v][0], sizes[v][1]);
    if (v != "input") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`);
      buttons[v].style("border-radius", "10px");
    }
  }	
	background(50);
	fill(100);
	let loading = [windowWidth/100, windowWidth/100, windowWidth*(3/10), windowHeight/10];
	rect(...loading);
	fill(158, 235, 52);
	rect(loading[0]+5, loading[1]+5, (loading[2]-10)*(n/limit), loading[3]-10);
	
	if (n < limit) {
		solve();
		n++;
	}
	console.log(n)
}
