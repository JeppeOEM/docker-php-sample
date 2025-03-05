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
    <link id="default-style" href="/css/style .css" rel="stylesheet" media="screen" type="text/css">
    <link id="default-style" href="/css/style2.css" rel="stylesheet" media="screen" type="text/css">
    <link id="default-style" href="/css/style3.css" rel="stylesheet" media="screen" type="text/css">
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
<body class="xform">
<div class="layout-container">
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
                <p>Here are some of my creative art experiments.</p>
            </div>
        </div>
      </div>
        <div class="bottom-left-box">
            <div id="menu page-content active" class="greyframe titledbox shadow0xb0">
                <div class="hdr"><h2 class="cap">Hello</h2></div>
      <p>I am Jeppe Marquardt, a full-stack web developer. 
      </p>
            </div>
        </div>
    </div>
<pre></pre>
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
</body>
</html>
