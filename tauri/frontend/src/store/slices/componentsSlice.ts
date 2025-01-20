import {createSlice} from "@reduxjs/toolkit";

type T_ComponentsSlice = {
    component_name: string
}

const initialState:T_ComponentsSlice = {
    component_name: "",
}


const componentsSlice = createSlice({
    name: 'components',
    initialState: initialState,
    reducers: {
        updateComponentName: (state, action) => {
            state.component_name = action.payload
        }
    }
})

export const { updateComponentName} = componentsSlice.actions;

export default componentsSlice.reducer