---
layout: post
title:  "Grunt is watching you code"
date:   2014-01-25 20:36:00
encoding: utf-8
categories: stuffs mythings
---

After taking some time in finding a proper organised way to work, I found this [repository][repository]. This is my "code's dissection" time so you can imagine what I did. 
Yes, I enabled the "research mode"!

This repository is based on a cool and "best practices" structure of defining an AngularJS web app. You could start your AngularJS project with this basic framework. So if 
you plan to start a project using AngularJS, I totally recommend it.

The first thing I did was taking a look to the package.json file. Other projects have 'nodeJS' with 'Express' framework as backend, but this one hadn't any. Just Grunt 
like a dev dependency (a dev dependency is a dependency that is not needed for production).

So, what is Grunt? [Grunt][grunt] is a JavaScript Task Runner which allows you to automate some tasks. Tasks like minification, compilation, unit testing, analysing 
your code, etc. In order to perform those tasks you must declare some dependencies in your package.json file of your project. These dependencies are plugins required 
by "Grunt" for configuring them in the Gruntfile.js file.

{% highlight javascript %}
	// An example of Grunt plugins
	...
	"name" : "try-grunt",
	...
	"devDependencies": {
		"grunt" : "~0.4.2",
		"grunt-contrib-watch" : "~0.4.0",
		"grunt-contrib-uglify" : "~0.2.0",
		"grunt-contrib-jshint" : "~0.4.1",
		"grunt-contrib-concat" : "~0.3.0",
	...
{% endhighlight %}

Once you have declared the dependencies, run **'npm install'** and wait until the packages are installed. If you don't have grunt installed, you must run 
**'npm -g install grunt-cli'**, it will put the grunt command in your system path.

With the dependencies installed it's time to create the Gruntfile.js file. Here is a well documented example of the file content:

{% highlight javascript %}
/* This is the "wrapper" function, needed for putting your Grunt-related things. */
module.exports = function(grunt){
   /* Here we are loading the required Grunt tasks. In this example, we need
      'uglify' and 'watch'. */
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');


   /* taskConfig is an object which will contain our tasks configuration. */
   var taskConfig = {
      /* We retrieve the configuration from the package.json file required by our banner. */
      pkg: grunt.file.readJSON('package.json'),
      /* 'uglify' is the task that performs the JS files minification. */
      uglify: {
         options: {
            /* This banner is placed at the top of our compiled source files. 
               "pkg.name" is referenced as the name property of the JSON object declared 
               on the package.json file (in this example, the name is "try-grunt". 
               'grunt.template.today("yyyy-mm-dd")' is a grunt function which returns the 
               todays date.
             */
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
         },
         /* "build" is a target. You could specify some targets (I'll explain them soon) */
         build: {
            /* In this case, it takes a file in the "src" directory, minifies it and makes 
               a minified copy in the "build" directory. Both directories are based on best
               practices of code's organization. */
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
            }
      },
      /* "watch" is the blessed task for a rapid development. With this task, 'grunt'
         automatically checks if any of the files mentioned below change, so it executes 
         the related tasks.*/
      watch: {
          /* With this magic option, you'll see the changes you made in your browser immediatelly
             (in this case they are just js files, so we won't see anything straight, 
             or maybe yes ;-))*/
          options: {
             livereload: true
          },
          /* For the sake of simplicity, we only check if JS files change, then perform
             the uglify task. The thing I want explain with targets is in this case when
             you perform the task with an particular target. */
          jssrc: {
             files: ['src/<%= pkg.name %>.js'],
             tasks: ['uglify:build']
          }  
      }
   };

   /* We pass the taskConfig object to this function because most grunt tasks rely on 
      the configuration data defined in this object. */
   grunt.initConfig(taskConfig);

   /* We must specify the "default" task. Let's put "uglify" as unique. */
   grunt.registerTask('default', ['uglify']);
};
{% endhighlight %}

And here we go! Type **'grunt watch'** and you will see that Grunt is waiting for if a JS file called "try-grunt.js"
(the name of the project followed by '.js' extension in this example) in the "src" directory has changed. If you 
haven't created the 'src' directory nor 'try-grunt.js' file yet, create them, then run **'grunt watch'** again and 
make a change in the file. You'll see the change in a minified version of the file in the "build" directory. Cool, huh? 
I encourage you to try the other plugins and set them up once and forget the configuration forever! 

[grunt]: http://gruntjs.com
[repository]: https://github.com/ngbp/ngbp
