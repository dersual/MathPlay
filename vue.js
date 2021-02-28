"use strict"

function newVue() {
  return new Vue({
    el: "#app",
    data: {
      game: {},
      tab: "level-select",
      win: false,
      quadraticSolving: false,
      levelType: 0,
      quadFail: 0,
      dropdowns: [
        //{name: "Arithmetic", section: ["Order of Operations"]}, 
        {name: "Algebra", section: ["Linear Equations",  "Solving Quadratics", "Factoring [COMING SOON]", "System of Equations [COMING SOON]"]}, 
        {name: "Geometry", section: ["Logic [COMING SOON]", "Geometry Proofs [COMING SOON]"]}, 
        {name: "Calculus", section: ["Limits [COMING SOON]", "Derivatives [COMING SOON]", "Integrals [COMING SOON]", "Differential Equations [COMING SOON]"]}, 
        {name: "How to play",link: "window.location.href='https://mathplay.glitch.me/about.html'"}, 
        {name: "About",link: ""}, 
      ],
    }
  })
}
//code goes brrrrr