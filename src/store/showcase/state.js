// src/store/showcase/state.js
// Always use a function to return state if you use SSR
export default function () {
  console.log('returned state')
  return {
    drawerState: true
  }
}