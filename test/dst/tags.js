
riot.tag2('app', '<h1>{title}</h1> <ul> <li each="{text, i in list}"> <hsltext index="{i}" length="{list.length}" text="{text}"></hsltext> </li> </ul>', 'app,[data-is="app"]{display:block;padding:16px 30px;min-height:100%;max-width:900px;margin:auto;background-color:white} app ul li,[data-is="app"] ul li{font-size:14px}', '', function(opts) {
    this.title = 'ribot test';
    this.on('mount', function() {
      var list = [];
      for (var i = 0; i < 40; ++i) {
        list.push('text text ' + (i + 1));
      }
      this.update({ list: list });
    });
});

riot.tag2('hsltext', '<span riot-style="color: hsl({opts.index / opts.length * 360}, 50%, 50%);">{opts.text}</span>', '', '', function(opts) {
});