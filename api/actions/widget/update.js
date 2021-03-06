import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject('Oh no! Widget save fails 20% of the time. Try again.');
      } else {
        //load方法得到的是一个Promise对象
        load(req).then(data => {
          const widgets = data;
          const widget = req.body;
          //如果request.body中的color是Green，那么模仿服务器端错误
          if (widget.color === 'Green') {
            reject({
              color: 'We do not accept green widgets' 
              // example server-side validation error
            });
          }
          if (widget.id) {
            console.log("服务端更新widget的id为:",widget.id);
            widgets[widget.id - 1] = widget;  
            //根据id来更新widget
            req.session.widgets = widgets;
          }
          resolve(widget);
        }, err => {
          reject(err);
        });
      }
    }, 1500); // simulate async db write
  });
}
