<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,600");

.navbar-laravel {
  background-color: #fff !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04) !important;
}

.card-body {
  padding: 0 !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body {
  background-color: #ffff !important;
  color: #636b6f !important;
  font-family: "Raleway", sans-serif !important;
  font-weight: 100 !important;
  height: 100vh !important;
  margin: 0 !important;
}
.full-height {
  height: 100vh !important;
}
.flex-center {
  align-items: center !important;
  display: flex !important;
  justify-content: center !important;
}
.position-ref {
  position: relative !important;
}
.top-right {
  position: absolute !important;
  right: 10px !important;
  top: 18px !important;
}
.content {
  text-align: center !important;
}
.title {
  font-size: 84px !important;
}
.links > a {
  color: #636b6f !important;
  padding: 0 25px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  letter-spacing: 0.1rem !important;
  text-decoration: none !important;
  text-transform: uppercase !important;
}
.m-b-md {
  margin-bottom: 30px !important;
}
</style>
