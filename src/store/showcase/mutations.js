/*
export function someMutation (state) {
}
*/

export const updateDrawerState = (state, openned) => {
    state.drawerState = openned
    state.counter =+1
  }
