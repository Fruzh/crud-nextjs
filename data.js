let books = [
  {
    "id": 1,
    "title": "The Wealth of Nations",
    "author": "Adam Smith",
    "desc": "Karya klasik yang menjadi dasar ekonomi modern, membahas pasar bebas, pembagian kerja, dan prinsip ekonomi liberal.",
    "content": "Buku ini memperkenalkan konsep 'tangan tak terlihat' (invisible hand) yang menjelaskan bagaimana kepentingan individu dapat menghasilkan manfaat kolektif melalui pasar bebas. Smith menguraikan pembagian kerja sebagai pendorong efisiensi dan produktivitas, serta membahas akumulasi modal, perdagangan internasional, dan peran pemerintah dalam ekonomi. Karya ini menjadi fondasi penting bagi teori ekonomi liberal dan kapitalisme modern, relevan untuk memahami dinamika pasar hingga saat ini."
  },
  {
    "id": 2,
    "title": "Security Analysis",
    "author": "Benjamin Graham & David Dodd",
    "desc": "Buku teknis yang menjadi panduan utama untuk analisis sekuritas dan investasi nilai, sering digunakan oleh investor profesional.",
    "content": "Buku ini adalah panduan komprehensif untuk mengevaluasi saham dan obligasi melalui analisis fundamental. Graham dan Dodd mengajarkan cara membaca laporan keuangan, menilai nilai intrinsik perusahaan, dan mengidentifikasi peluang investasi yang undervalued. Buku ini juga menekankan pentingnya pendekatan konservatif dalam investasi, dengan fokus pada data daripada spekulasi. Edisi terbaru tetap relevan bagi investor yang ingin mendalami analisis sekuritas secara mendalam."
  },
  {
    "id": 3,
    "title": "The Intelligent Investor",
    "author": "Benjamin Graham",
    "desc": "Dianggap sebagai 'Alkitab' investasi, buku ini memperkenalkan konsep investasi nilai (value investing) yang berfokus pada analisis fundamental dan pengendalian emosi dalam berinvestasi.",
    "content": "Graham menguraikan prinsip investasi jangka panjang, termasuk konsep 'margin of safety' untuk mengurangi risiko dengan membeli saham di bawah nilai intrinsiknya. Buku ini juga membahas pentingnya disiplin emosional untuk menghindari keputusan impulsif akibat fluktuasi pasar. Dengan analogi seperti 'Mr. Market,' Graham mengajarkan investor untuk fokus pada nilai bisnis daripada harga saham. Buku ini wajib dibaca bagi siapa saja yang ingin berinvestasi dengan pendekatan rasional."
  },
  {
    "id": 5,
    "title": "A Random Walk Down Wall Street",
    "author": "Burton G. Malkiel",
    "desc": "Buku klasik yang memperdebatkan efisiensi pasar dan merekomendasikan strategi investasi pasif, seperti indeks dana.",
    "content": "Malkiel memperkenalkan teori 'random walk,' yang menyatakan bahwa pergerakan harga saham tidak dapat diprediksi secara konsisten karena pasar efisien. Ia menganjurkan investasi dalam dana indeks berbiaya rendah untuk diversifikasi dan hasil jangka panjang yang lebih baik daripada mencoba 'mengalahkan pasar.' Buku ini juga mengkritik strategi investasi aktif seperti stock picking dan market timing, dengan data historis yang mendukung pendekatan pasif."
  },
  {
    "id": 6,
    "title": "Principles: Life and Work",
    "author": "Ray Dalio",
    "desc": "Buku ini berbagi prinsip-prinsip yang digunakan oleh Ray Dalio, pendiri hedge fund Bridgewater Associates, untuk sukses dalam keuangan, investasi, dan kehidupan.",
    "content": "Dalio membagikan pendekatan sistematisnya dalam pengambilan keputusan, yang didasarkan pada prinsip-prinsip yang teruji. Ia menjelaskan cara membangun portofolio investasi yang tahan terhadap berbagai kondisi pasar melalui diversifikasi dan manajemen risiko. Konsep seperti 'radical transparency' dan 'idea meritocracy' juga dibahas sebagai kunci sukses organisasi. Buku ini cocok untuk investor, pemimpin bisnis, atau siapa saja yang ingin mengembangkan pendekatan berbasis prinsip dalam hidup."
  },
  {
    "id": 7,
    "title": "Capital in the Twenty-First Century",
    "author": "Thomas Piketty",
    "desc": "Buku ini menganalisis ketimpangan ekonomi sepanjang sejarah dan berargumen bahwa kapitalisme cenderung memperburuk ketimpangan kecuali ada intervensi.",
    "content": "Dengan data historis yang luas, Piketty menunjukkan bahwa tingkat pengembalian modal (r) secara konsisten melebihi pertumbuhan ekonomi (g), menyebabkan konsentrasi kekayaan di tangan segelintir orang. Ia mengusulkan solusi seperti pajak progresif global untuk mengatasi ketimpangan. Buku ini memicu debat luas tentang kapitalisme dan kebijakan ekonomi, menjadikannya penting untuk memahami dinamika ekonomi makro dan distribusi kekayaan."
  },
  {
    "id": 8,
    "title": "Rich Dad Poor Dad",
    "author": "Robert Kiyosaki & Sharon Lechter",
    "desc": "Buku pengelolaan keuangan pribadi yang mengajarkan literasi finansial dan pola pikir kaya melalui cerita sederhana.",
    "content": "Melalui perbandingan antara 'ayah kaya' (mentor finansial) dan 'ayah miskin' (ayah biologis), buku ini mengajarkan pentingnya membedakan aset dan liabilitas, berinvestasi untuk pendapatan pasif, dan mengembangkan pendidikan finansial. Kiyosaki menekankan pola pikir kaya, seperti mencari peluang dan mengelola risiko, untuk mencapai kebebasan finansial. Buku ini mudah dipahami dan inspiratif bagi pemula dalam pengelolaan keuangan."
  },
  {
    "id": 9,
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "desc": "Buku yang menjelaskan cara kerja pikiran manusia dalam pengambilan keputusan, relevan untuk investasi dan ekonomi perilaku.",
    "content": "Kahneman, pemenang Nobel Ekonomi, memperkenalkan dua sistem berpikir: Sistem 1 (cepat, intuitif) dan Sistem 2 (lambat, analitis). Buku ini menguraikan bias kognitif seperti overconfidence dan loss aversion yang memengaruhi keputusan finansial. Dengan contoh praktis, Kahneman membantu investor memahami bagaimana emosi dan persepsi dapat mengganggu pengambilan keputusan yang rasional, menjadikan buku ini penting untuk ekonomi perilaku."
  },
  {
    "id": 10,
    "title": "The Millionaire Next Door",
    "author": "Thomas J. Stanley & William D. Danko",
    "desc": "Studi tentang kebiasaan orang kaya di Amerika, menyoroti pentingnya hemat dan investasi untuk membangun kekayaan.",
    "content": "Berdasarkan penelitian ekstensif, buku ini mengungkap bahwa banyak jutawan hidup sederhana, menghindari gaya hidup boros, dan fokus pada akumulasi aset seperti saham dan properti. Stanley dan Danko menekankan pentingnya disiplin finansial, perencanaan jangka panjang, dan hidup di bawah kemampuan untuk mencapai kekayaan. Buku ini memberikan wawasan praktis tentang pola pikir dan kebiasaan orang kaya."
  },
  {
    "id": 11,
    "title": "Your Money or Your Life",
    "author": "Vicki Robin & Joe Dominguez",
    "desc": "Panduan untuk mencapai kebebasan finansial melalui pengelolaan keuangan yang sadar dan hidup sederhana.",
    "content": "Buku ini menawarkan pendekatan sembilan langkah untuk mengelola keuangan, termasuk melacak setiap pengeluaran, mengevaluasi apakah pengeluaran sesuai dengan nilai pribadi, dan mengurangi ketergantungan pada pendapatan aktif. Dengan fokus pada kesederhanaan dan kesadaran, buku ini membantu pembaca merancang kehidupan yang bebas dari tekanan finansial, cocok untuk mereka yang mencari kebebasan finansial."
  },
  {
    "id": 12,
    "title": "The Little Book of Common Sense Investing",
    "author": "John C. Bogle",
    "desc": "Buku yang mempromosikan investasi indeks berbiaya rendah sebagai cara terbaik untuk membangun kekayaan jangka panjang.",
    "content": "Bogle, pendiri Vanguard, menjelaskan mengapa dana indeks adalah pilihan terbaik bagi investor rata-rata karena biaya rendah, diversifikasi luas, dan kinerja yang konsisten mengikuti pasar. Buku ini membandingkan investasi aktif dan pasif, dengan data yang menunjukkan bahwa sebagian besar manajer aktif gagal mengalahkan indeks dalam jangka panjang. Ini adalah panduan praktis untuk investor pemula maupun berpengalaman."
  },
  {
    "id": 13,
    "title": "One Up On Wall Street",
    "author": "Peter Lynch",
    "desc": "Panduan investasi dari salah satu manajer dana terbaik, mengajarkan cara menemukan peluang investasi di kehidupan sehari-hari.",
    "content": "Lynch, mantan manajer Fidelity Magellan Fund, mendorong investor untuk memanfaatkan pengetahuan sehari-hari untuk menemukan perusahaan dengan potensi pertumbuhan, seperti merek yang sering mereka gunakan. Ia menjelaskan cara mengevaluasi saham pertumbuhan, mengelola portofolio, dan menghindari jebakan emosional. Buku ini penuh dengan nasihat praktis dan kisah sukses Lynch dalam investasi."
  },
  {
    "id": 14,
    "title": "The Richest Man in Babylon",
    "author": "George S. Clason",
    "desc": "Buku klasik tentang pengelolaan keuangan pribadi melalui cerita-cerita dari Babilonia kuno.",
    "content": "Dengan perumpamaan yang mudah dipahami, buku ini mengajarkan prinsip keuangan abadi seperti menyisihkan 10% dari pendapatan untuk investasi, menghindari utang konsumtif, dan mencari nasihat dari ahli. Cerita seperti 'Tujuh Obat untuk Dompet Kosong' memberikan pelajaran praktis tentang cara membangun kekayaan secara bertahap, cocok untuk semua kalangan."
  },
  {
    "id": 15,
    "title": "The Psychology of Money",
    "author": "Morgan Housel",
    "desc": "Buku yang mengeksplorasi hubungan emosional dengan uang dan bagaimana perilaku memengaruhi keputusan finansial.",
    "content": "Housel menggunakan cerita pendek untuk mengilustrasikan bahwa kesuksesan finansial lebih bergantung pada perilaku daripada kecerdasan teknis. Ia menyoroti pentingnya kesabaran, konsistensi, dan pemahaman bahwa kekayaan sering kali dibangun melalui waktu, bukan keberuntungan atau risiko besar. Buku ini menawarkan wawasan psikologis yang relevan untuk investor dan siapa saja yang ingin mengelola keuangan dengan bijak."
  },
  {
    "id": 16,
    "title": "Common Stocks and Uncommon Profits",
    "author": "Philip Fisher",
    "desc": "Buku klasik tentang investasi saham yang berfokus pada analisis kualitatif perusahaan.",
    "content": "Fisher mengajarkan cara mengevaluasi perusahaan berdasarkan manajemen, inovasi, dan potensi pertumbuhan jangka panjang, melengkapi pendekatan kuantitatif Graham."
  },
  {
    "id": 17,
    "title": "The Essays of Warren Buffett",
    "author": "Warren Buffett, disusun oleh Lawrence A. Cunningham",
    "desc": "Kumpulan surat Buffett kepada pemegang saham Berkshire Hathaway, berisi wawasan tentang investasi dan bisnis.",
    "content": "Buku ini merangkum filosofi investasi Buffett, termasuk pentingnya membeli bisnis berkualitas tinggi dengan harga wajar dan memegangnya untuk jangka panjang."
  },
  {
    "id": 18,
    "title": "The Snowball: Warren Buffett and the Business of Life",
    "author": "Alice Schroeder",
    "desc": "Biografi Warren Buffett yang menjelaskan perjalanan hidup dan strategi investasinya.",
    "content": "Buku ini menggambarkan bagaimana Buffett membangun kekayaan melalui investasi nilai, dengan cerita tentang kedisiplinan, kesabaran, dan fokus pada nilai jangka panjang."
  },
  {
    "id": 19,
    "title": "Liar's Poker",
    "author": "Michael Lewis",
    "desc": "Cerita tentang dunia keuangan Wall Street pada 1980-an, memberikan wawasan tentang budaya dan risiko di industri ini.",
    "content": "Buku ini menceritakan pengalaman Lewis sebagai pedagang obligasi, menyoroti sifat spekulatif pasar keuangan dan pelajaran tentang risiko."
  },
  {
    "id": 20,
    "title": "The Big Short",
    "author": "Michael Lewis",
    "desc": "Buku yang menceritakan kisah investor yang memprediksi krisis keuangan 2008 dan mendapat keuntungan dari gelembung perumahan.",
    "content": "Lewis menjelaskan bagaimana beberapa investor mengidentifikasi kelemahan di pasar hipotek dan menggunakan derivatif untuk bertaruh melawan pasar, dengan pelajaran tentang risiko sistemik."
  },
  {
    "id": 21,
    "title": "Barbarians at the Gate",
    "author": "Bryan Burrough & John Helyar",
    "desc": "Kisah nyata tentang leveraged buyout RJR Nabisco, menggambarkan dunia keuangan korporat dan private equity.",
    "content": "Buku ini menceritakan pertarungan untuk mengakuisisi RJR Nabisco, menyoroti strategi keuangan, negosiasi, dan dinamika kekuasaan di dunia bisnis."
  },
  {
    "id": 22,
    "title": "Freakonomics",
    "author": "Steven D. Levitt & Stephen J. Dubner",
    "desc": "Buku yang menggunakan prinsip ekonomi untuk menjelaskan fenomena sosial yang tidak biasa.",
    "content": "Levitt dan Dubner menganalisis topik seperti kejahatan dan pendidikan dengan pendekatan ekonomi, menunjukkan bagaimana insentif memengaruhi perilaku manusia."
  },
  {
    "id": 23,
    "title": "The Black Swan",
    "author": "Nassim Nicholas Taleb",
    "desc": "Buku yang membahas peristiwa tak terduga dengan dampak besar dan bagaimana memahami ketidakpastian dalam keuangan.",
    "content": "Taleb memperkenalkan konsep 'black swan,' peristiwa langka yang mengubah pasar. Buku ini relevan untuk memahami risiko dan ketidakpastian dalam investasi."
  },
  {
    "id": 24,
    "title": "Too Big to Fail",
    "author": "Andrew Ross Sorkin",
    "desc": "Kronik krisis keuangan 2008, fokus pada peran bank besar dan intervensi pemerintah.",
    "content": "Buku ini menceritakan bagaimana Wall Street dan Washington menangani krisis, dengan wawasan tentang kebijakan moneter, bailout, dan dampak sistemik kegagalan bank."
  },
  {
    "id": 25,
    "title": "Debt: The First 5000 Years",
    "author": "David Graeber",
    "desc": "Buku yang menelusuri sejarah utang dan perannya dalam membentuk masyarakat dan ekonomi.",
    "content": "Graeber menggali asal-usul utang, dari barter hingga sistem keuangan modern, menawarkan perspektif antropologis tentang ekonomi dan kekuasaan."
  },
  {
    "id": 26,
    "title": "The Lean Startup",
    "author": "Eric Ries",
    "desc": "Panduan untuk membangun bisnis dengan pendekatan efisien, relevan untuk wirausaha dan investor.",
    "content": "Ries memperkenalkan konsep 'validated learning' dan 'minimum viable product,' membantu pengusaha membangun bisnis dengan risiko minimal, yang penting bagi investor ventura."
  },
  {
    "id": 27,
    "title": "Zero to One",
    "author": "Peter Thiel & Blake Masters",
    "desc": "Buku tentang inovasi dan membangun perusahaan yang menciptakan sesuatu yang benar-benar baru.",
    "content": "Thiel berargumen bahwa startup sukses harus menciptakan monopoli dengan inovasi radikal, bukan bersaing di pasar yang sudah ada. Penting untuk investor dan wirausaha."
  }
];

export { books };