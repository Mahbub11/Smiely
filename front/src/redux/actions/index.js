import { createAction } from "@reduxjs/toolkit";


export const ShowsnackBar= createAction('ShowsnackBar',({severity,message})=>({

    payload:{
        severity,
        message
    },
}));

export const ClosesnackBar= createAction('ClosesnackBar');

export const ToggleSideBar= createAction('ToggleSideBar',({type})=>({

    payload:{
        type
    },
}));
export const CheckOutType= createAction('CheckOutType',({type})=>({

    payload:{
        type
    },
}));

export const ToggleBlury= createAction('ToggleBlury');
export const ToggleMode= createAction('ToggleMode');


