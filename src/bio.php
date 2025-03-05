
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en-US">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>mrqdt.xyz</title>
	<meta name="description" content="Home of the world's biggest collection of classic text mode fonts, system fonts and BIOS fonts from DOS-era IBM PCs and compatibles">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link id="default-style" href="css/style .css" rel="stylesheet" media="screen" type="text/css">
	<link id="default-style" href="css/style2.css" rel="stylesheet" media="screen" type="text/css">
	<link id="default-style" href="css/style3.css" rel="stylesheet" media="screen" type="text/css">
	<link id="mq-style" href="css/oldschool-pc-fonts-mq0cef.css?ver=II.II" rel="stylesheet" media="screen" type="text/css">
	<script defer src="./web-components/comp-dd/comp-dd.js" type="text/javascript"></script>
	<script defer src="./js/index.js" type="text/javascript"></script>
		<link rel="apple-touch-icon" href="../apple-touch-icon.png">
		<link rel="icon" type="image/png" href="../favicon.png">
		<link rel="mask-icon" href="../safari-pinned-tab.svg">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="msapplication-TileImage" content="/mstile-144x144.png">
		<meta name="theme-color" content="#000000">
</head>
	<body class="xform">

<div class ="layout-container">
   <div class="side-bar">
    <?php include 'menu.php'; ?>
    </div>
    <div class="main-content">

				<h1>,.)&Bio&(.,</h1>
			
		<div id="action-panels" class="centerme ilbl">
			<a class="panel-zaz shadow0xb0" href="fontlist/index.html" style="background-image:url(images/panel1.jpg);">
				<h2 class="cap">Font Index</h2>
				<div>Browse / preview all fonts and try them out</div>
			</a>
			<a class="panel-zaz shadow0xb0" href="readme/index.html" style="background-image:url(images/panel2.jpg);">
				<h2 class="cap">ReadMe</h2>
				<div>Documentation, FAQ,<br>and usage notes</div>
			</a>
			<a class="panel-zaz shadow0xb0" href="showcase/index.html" style="background-image:url(images/panel3.jpg);">
				<h2 class="cap">Samples+Showcase</h2>
				<div>See some classic PC<br>fonts in action</div>
			</a>
			<a class="panel-zaz shadow0xb0" href="download/index.html" style="background-image:url(images/panel4.jpg);">
				<h2 class="cap">Download</h2>
				<div>LEECH 'EM ALL! (or<br>just selected subsets)</div>
			</a>
		</div>
</div>
      <div class="bottom-left-box">

      <div id="menu" class="greyframe titledbox shadow0xb0">
          <div class="hdr"><h2 class="cap">Hello</h2></div>
          <p>Hi i am Jeppe Marquardt, a creative web developer, who thinks code is actually beautifull</p>
           i consume everything from x86 assembly to css 
          <dl>
              <comp-dd href="index.php" text="Home"></comp-dd>
              <comp-dd href="bio.php" text="Bio"></comp-dd>
              <comp-dd href="portfolio.php" text="Portfolio"></comp-dd>
              <comp-dd href="art.php" text="Art"></comp-dd>
          </dl>
      </div>
      </div>
</div>



		<!--</div>-->
</body>

      <style type="text/css" media="screen">
        pre {
          transform: rotate(180deg);
          z-index: 0;
          position: fixed;
          margin:0;
          padding:0;
          width:100vw;
          height:102vh;
          color: rgba(0, 255, 255, 0.74) !important;

          line-height: 1.2;
        }
      </style>
      <script type="module">
        import { run } from './run.js'
        import * as program from './programs/contributed/slime_dish2.js'
        run(program, { element : document.querySelector('pre') }).then(function(e){
          console.log(e)
        }).catch(function(e) {
          console.warn(e.message)
          console.log(e.error)
        })



</script>
</html>
