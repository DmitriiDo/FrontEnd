import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import rocketsReducer from "./slices/rocketsSlice.ts"
import componentsReducer from "./slices/componentsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        rockets: rocketsReducer,
        components: componentsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;