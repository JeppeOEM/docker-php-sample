<?php
// Get the requested URL path
$request_uri = $_SERVER['REQUEST_URI'];

// Remove query string if present
$request_uri = strtok($request_uri, '?');

// Remove leading slash
$request_uri = ltrim($request_uri, '/');

// If empty, set to home
if (empty($request_uri)) {
    $page = 'home';
} else {
    // Use the requested path as the page name
    $page = $request_uri;
}

// Sanitize the page name to prevent security issues
$page = preg_replace('/[^a-zA-Z0-9_-]/', '', $page);

// Default to home if the page name gets completely sanitized away
if (empty($page)) {
    $page = 'home';
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en-US">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>mrqdt.xyz</title>
    <meta name="description" content="Home of the world's biggest collection of classic text mode fonts, system fonts and BIOS fonts from DOS-era IBM PCs and compatibles">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link id="default-style" href="/css/style.css" rel="stylesheet" media="screen" type="text/css">
    <!-- <link id="default-style" href="/css/style2.css" rel="stylesheet" media="screen" type="text/css"> -->
    <!-- <link id="default-style" href="/css/style3.css" rel="stylesheet" media="screen" type="text/css"> -->
    <link id="mq-style" href="/css/oldschool-pc-fonts-mq0cef.css?ver=II.II" rel="stylesheet" media="screen" type="text/css">
    <script defer src="/web-components/comp-dd/comp-dd.js" type="text/javascript"></script>
    <script defer src="/js/index.js" type="text/javascript"></script>
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="mask-icon" href="/safari-pinned-tab.svg">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#000000">
    <!-- Add a variable to pass the current page to JavaScript -->
    <script>
        // Store the current page as a JavaScript variable
        window.currentPage = '<?php echo $page; ?>';
    </script>
</head>
<body>
  <div class="column-flex">
    <div class="top-section">
      <div class="center-flex">
        <div class="left-box">
          gg
        </div>
        <pre id="ascii-logo">
<b><span style="color:#555555">$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$</span></b>
<b><span style="color:#555555">$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$</span></b>
<b><span style="color:#555555">ⁿPⁿ""""""""ⁿPⁿ""ⁿT""""""""""ⁿS$$$$$$$Pⁿ"""""ⁿTⁿ""""""""""""ⁿT</span></b> <b><span style="color:#555555">"""""""""""""""#</span></b>
<span style="color:#0A0">"ⁿg$$$bⁿ$$$$ⁿg$$$b<b><span style="color:#555555">:</span></b></span><span style="color:#0A0">ⁿ$$$$$ⁿ""$@g.<b><span style="color:#555555">`T$$'</span></b></span>.<span style="color:#0A0">$@$ⁿ"ⁿS@g.""ⁿ$$$$$ⁿ"dS d$$$$ⁿ$$$$$ⁿ$$$$b<span style="color:#555555">
<b><span style="color:#555555"></span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555">  <span style="color:#0A0">$$<span style="color:#555555">  <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span></span></span></span></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">!$<b style="color:#48ff59">¼</b></span><span style="color:#0A0">$L<span style="color:#555555"> <b><span style="color:#555555">$'</span></b></span></span><span style="color:#0A0">j$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">#</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">$L<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">#</span></b></span></span> <span style="color:#0A0">L<span style="color:#555555"> <span style="color:#0A0">$ .<span style="color:#555555"> <b><span style="color:#555555">n</span></b></span></span></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">n.</span></b></span></span> <span style="color:#0A0">"$<span style="color:#555555">
<b><span style="color:#555555"></span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555">  <span style="color:#0A0">√'<b><span style="color:#555555">:</span></b></span></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$b</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$b</span></b></span></span> <span style="color:#0A0">L'<b>s</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">S$S</span></b></span></span> <span style="color:#0A0">'<span style="color:#555555">
<b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">L.,$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">ⁿ'</span></b></span></span><span style="color:#0A0">j$<b style="color:#48ff59">¼</b></span><span style="color:#0A0">$P<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$$$$$</span></b></span></span>
<b><span style="color:#555555">$</span></b> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$$$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555">.<span style="color:#0A0">md$<b style="color:#48ff59">¼</b></span></span></span><span style="color:#0A0">$'<span style="color:#555555"> <b><span style="color:#555555">j$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">&$<span style="color:#555555"> <b><span style="color:#555555">$$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$$$$$</span></b></span></span>
<b><span style="color:#555555">$</span></b> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$$$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">.</span></b></span></span><span style="color:#0A0">`"$$$L.<span style="color:#555555">  <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span></span></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">!</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">::</span></b></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$</span></b></span></span> <span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$$$$$</span></b></span></span>
 <span style="color:#0A0">j$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">$$"</span></b></span></span> <span style="color:#0A0">j$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<b><span style="color:#555555">:</span></b></span><span style="color:#0A0">j$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">T$.</span></b></span></span><span style="color:#0A0">`$<b style="color:#48ff59">¼¼</b></span><span style="color:#0A0">$L<span style="color:#555555"> <span style="color:#0A0">T$<b style="color:#48ff59">¼¼</b></span></span></span><span style="color:#0A0">$<span style="color:#555555"> <span style="color:#0A0">S<span style="color:#555555"> <span style="color:#0A0">$<b style="color:#48ff59">¼¼</b></span></span></span></span></span><span style="color:#0A0">$p<b><span style="color:#555555">'</span></b></span><span style="color:#0A0">j$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">ⁿ'</span></b></span></span><span style="color:#0A0">j$<b style="color:#48ff59">¼</b></span><span style="color:#0A0">$P<span style="color:#555555"> <b><span style="color:#555555">'</span></b></span></span><span style="color:#0A0">j$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">n$$$$$</span></b></span></span>
<span style="color:#0A0">$@ⁿ"""<span style="color:#555555"> <b><span style="color:#555555">.i</span></b></span></span> <span style="color:#0A0">j$@ⁿ"""<span style="color:#555555"> <span style="color:#0A0">L@ⁿ"""ⁿL<b><span style="color:#555555"> <span style="color:#555555">$$<span style="color:#555555"> </span></span></span></b></span></span></span><span style="color:#0A0">$<b style="color:#48ff59">¼¼¼</b></span><span style="color:#0A0">$<span style="color:#555555"> <b><span style="color:#555555">.</span></b></span></span><span style="color:#0A0">`ⁿ@$L_SS@ⁿ`j$@ⁿ"""ⁿ@md$@ⁿ`<span style="color:#555555"> <span style="color:#0A0">j$"ⁿ"""ⁿbm<span style="color:#555555"> <b><span style="color:#555555">S$$$</span></b></span></span></span></span>
<b><span style="color:#555555">nS$$$$$L.,mS$$$.,,m#$$$#,j$$</span></b> <span style="color:#0A0">$ⁿ"""<b><span style="color:#555555"> $S#m,... </span></b></span><span style="color:#0A0">$Sm<b><span style="color:#555555"> .,#$$$#m,.,m##hs <span style="color:#0AA">!<span style="color:#fd5b5a">.xyz<span style="color:#0AA">¡</span></span></span></span></b></span> <b><span style="color:#555555">.,m#$$</span></b>
<b><span style="color:#555555">$$$$$$$$$$$$$$$$$$$$$$$$$$$$SssS$$$$$$$$$$$S </span></b><span style="color:#0A0">$ⁿ""ⁿ<b><span style="color:#555555"> S$$$$$$$$$$$$$$SssssssS$$$$$</span></b></span>
<b><span style="color:#555555">$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$SsS$$Ss$$$$$$$$$$$$$$$$$$$$$$$$$$$$</span></b>
</pre>

        <div class="right-box">
          gg
        </div>

      </div>

    </div>

    <div id="line-container">
        <div id="top-line" class="box-line"></div>
        <div id="middle-line" class="box-line"></div>
        <div id="bottom-line" class="box-line"></div>
    </div>
<div class="main-content">
 <h2>gg</h2>
</div>

  </div>
   <div class="side-bar">
    <?php include 'menu.php'; ?>
    </div>
    <div class="main-content">

        <!-- Content container to hold all the sliding pages -->
        <div class="content-container">
            <!-- Home content -->
            <div id="home-content" class="page-content <?php echo ($page === 'home') ? 'active' : ''; ?>">
                <h3>Welcome Home</h3>
                <p>This is the home page content. Click on the menu items to see the sliding transitions.</p>
            </div>

            <!-- Bio content -->
            <div id="bio-content" class="page-content <?php echo ($page === 'bio') ? 'active' : ''; ?>">
                <h3>Biography</h3>
                <p>Here's my biography and background information.</p>
            </div>

            <!-- Portfolio content -->
            <div id="portfolio-content" class="page-content <?php echo ($page === 'portfolio') ? 'active' : ''; ?>">
                <h3>My Portfolio</h3>
                <p>Check out my latest projects and work examples.</p>
            </div>

            <!-- Art content -->
            <div id="art-content" class="page-content <?php echo ($page === 'art') ? 'active' : ''; ?>">
                <h3>Art Projects</h3>
                <p>.Here are some of my creative art experiments.</p>
            </div>
        </div>
      </div>
  </div>

      <!--  <div class="bottom-left-box">-->
      <!--      <div id="menu page-content active" class="greyframe titledbox shadow0xb0">-->
      <!--          <div class="hdr"><h2 class="cap">Hello</h2></div>-->
      <!--<p>I am Jeppe Marquardt, a full-stack web developer. -->
      <!--</p>-->
      <!--      </div>-->
      <!--  </div>-->
    </div>
<pre></pre>
<pre class="layer"></pre>
<script type="module">
    import { run } from './run.js'
    import * as program from './programs/contributed/letters.js'
    //import * as program2 from './programs/contributed/slime_dish2.js'
    run(program, { element : document.querySelector('pre') }).then(function(e){
      console.log(e)
    }).catch(function(e) {
      console.warn(e.message)
      console.log(e.error)
        })


</script>
</body>
</html>
