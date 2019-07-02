  export default function setAuth(Echo) {
      const token = localStorage.getItem('token');
      if (token) {
          window.Pusher = require('pusher-js');
          window.Echo = new Echo({
              broadcaster: 'pusher',
              key: "KEY",

              host: 'http://localhost:8000',
              auth: {
                  headers: {
                      'Authorization': token
                  }
              }
          });
      } else {}
  };