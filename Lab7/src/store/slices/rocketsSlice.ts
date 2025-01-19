import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Rocket, T_RocketsFilters, T_Component} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_RocketsSlice = {
    draft_rocket_id: number | null,
    components_count: number | null,
    rocket: T_Rocket | null,
    rockets: T_Rocket[],
    filters: T_RocketsFilters,
    save_mm: boolean
}

const initialState:T_RocketsSlice = {
    draft_rocket_id: null,
    components_count: null,
    rocket: null,
    rockets: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0]
    },
    save_mm: false
}

export const fetchRocket = createAsyncThunk<T_Rocket, string, AsyncThunkConfig>(
    "rockets/rocket",
    async function(rocket_id) {
        const response = await api.rockets.rocketsRead(rocket_id) as AxiosResponse<T_Rocket>
        return response.data
    }
)

export const fetchRockets = createAsyncThunk<T_Rocket[], object, AsyncThunkConfig>(
    "rockets/rockets",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.rockets.rocketsList({
            status: state.rockets.filters.status,
            date_formation_start: state.rockets.filters.date_formation_start,
            date_formation_end: state.rockets.filters.date_formation_end
        }) as AxiosResponse<T_Rocket[]>
        return response.data
    }
)

export const removeComponentFromDraftRocket = createAsyncThunk<T_Component[], string, AsyncThunkConfig>(
    "rockets/remove_component",
    async function(component_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.rockets.rocketsDeleteComponentDelete(state.rockets.rocket.id, component_id) as AxiosResponse<T_Component[]>
        return response.data
    }
)

export const deleteDraftRocket = createAsyncThunk<void, object, AsyncThunkConfig>(
    "rockets/delete_draft_rocket",
    async function(_, {getState}) {
        const state = getState()
        await api.rockets.rocketsDeleteDelete(state.rockets.rocket.id)
    }
)

export const sendDraftRocket = createAsyncThunk<void, object, AsyncThunkConfig>(
    "rockets/send_draft_rocket",
    async function(_, {getState}) {
        const state = getState()
        await api.rockets.rocketsUpdateStatusUserUpdate(state.rockets.rocket.id)
    }
)

export const updateRocket = createAsyncThunk<void, object, AsyncThunkConfig>(
    "rockets/update_rocket",
    async function(data, {getState}) {
        const state = getState()
        await api.rockets.rocketsUpdateUpdate(state.rockets.rocket.id, {
            ...data
        })
    }
)

export const updateComponentValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "rockets/update_mm_value",
    async function({component_id, count},thunkAPI) {
        const state = thunkAPI.getState()
        await api.rockets.rocketsUpdateComponentUpdate(state.rockets.rocket.id, component_id, {count})
    }
)

const rocketsSlice = createSlice({
    name: 'rockets',
    initialState: initialState,
    reducers: {
        saveRocket: (state, action) => {
            state.draft_rocket_id = action.payload.draft_rocket_id
            state.components_count = action.payload.components_count
        },
        removeRocket: (state) => {
            state.rocket = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRocket.fulfilled, (state:T_RocketsSlice, action: PayloadAction<T_Rocket>) => {
            state.rocket = action.payload
        });
        builder.addCase(fetchRockets.fulfilled, (state:T_RocketsSlice, action: PayloadAction<T_Rocket[]>) => {
            state.rockets = action.payload
        });
        builder.addCase(removeComponentFromDraftRocket.rejected, (state:T_RocketsSlice) => {
            state.rocket = null
        });
        builder.addCase(removeComponentFromDraftRocket.fulfilled, (state:T_RocketsSlice, action: PayloadAction<T_Component[]>) => {
            if (state.rocket) {
                state.rocket.components = action.payload as T_Component[]
            }
        });
        builder.addCase(sendDraftRocket.fulfilled, (state:T_RocketsSlice) => {
            state.rocket = null
        });
    }
})

export const { saveRocket, removeRocket, triggerUpdateMM, updateFilters } = rocketsSlice.actions;

export default rocketsSlice.reducer