//////
// ryw:blog Configuration
//////

/*global Blog*/

Blog.config({
    title: 'Portfolio Website',
    adminRole:  'blogAdmin',
    authorRole: 'blogAuthor',
    rss: {
      title: 'My Portfolio Website',
      description: 'Austin Kennys Portfolio',
    },
    blogIndexTemplate: 'myBlogIndexTemplate',    // '/blog' route
    syntaxHighlighting: true,                    // default is false
    // syntaxHighlightingTheme: 'solarized.dark' // default is 'github'
    syntaxHighlightingTheme: 'rainbow',          // default is 'github'
    dateFormat: 'lll',                           // Moment.js format
    pageSize: 5                                  // How many blogs to display on blogs page. 
});

