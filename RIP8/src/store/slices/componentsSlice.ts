import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Component, T_ComponentAddData, T_ComponentsListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveRocket} from "store/slices/rocketsSlice.ts";
import {Component} from "src/api/Api.ts";

type T_ComponentsSlice = {
    component_name: string
    component: null | T_Component
    components: T_Component[]
}

const initialState:T_ComponentsSlice = {
    component_name: "",
    component: null,
    components: []
}

export const fetchComponent = createAsyncThunk<T_Component, string, AsyncThunkConfig>(
    "fetch_component",
    async function(id) {
        const response = await api.components.componentsRead(id) as AxiosResponse<T_Component>
        return response.data
    }
)

export const fetchComponents = createAsyncThunk<T_Component[], object, AsyncThunkConfig>(
    "fetch_components",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.components.componentsList({
            component_name: state.components.component_name
        }) as AxiosResponse<T_ComponentsListResponse>

        thunkAPI.dispatch(saveRocket({
            draft_rocket_id: response.data.draft_rocket_id,
            components_count: response.data.components_count
        }))

        return response.data.components
    }
)

export const addComponentToRocket = createAsyncThunk<void, string, AsyncThunkConfig>(
    "components/add_component_to_rocket",
    async function(component_id) {
        await api.components.componentsAddToRocketCreate(component_id)
    }
)

export const deleteComponent = createAsyncThunk<T_Component[], string, AsyncThunkConfig>(
    "delete_component",
    async function(component_id) {
        const response = await api.components.componentsDeleteDelete(component_id) as AxiosResponse<T_Component[]>
        return response.data
    }
)

export const updateComponent = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_component",
    async function({component_id, data}) {
        await api.components.componentsUpdateUpdate(component_id as string, data as Component)
    }
)

export const updateComponentImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_component_image",
    async function({component_id, data}) {
        await api.components.componentsUpdateImageCreate(component_id as string, data as {image?: File})
    }
)

export const createComponent = createAsyncThunk<void, T_ComponentAddData, AsyncThunkConfig>(
    "update_component",
    async function(data) {
        await api.components.componentsCreateCreate(data)
    }
)

const componentsSlice = createSlice({
    name: 'components',
    initialState: initialState,
    reducers: {
        updateComponentName: (state, action) => {
            state.component_name = action.payload
        },
        removeSelectedComponent: (state) => {
            state.component = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComponents.fulfilled, (state:T_ComponentsSlice, action: PayloadAction<T_Component[]>) => {
            state.components = action.payload
        });
        builder.addCase(fetchComponent.fulfilled, (state:T_ComponentsSlice, action: PayloadAction<T_Component>) => {
            state.component = action.payload
        });
        builder.addCase(deleteComponent.fulfilled, (state:T_ComponentsSlice, action: PayloadAction<T_Component[]>) => {
            state.components = action.payload
        });
    }
})

export const { updateComponentName, removeSelectedComponent} = componentsSlice.actions;

export default componentsSlice.reducer