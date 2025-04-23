// import * as React from "react"
// import { toast as sonnerToast } from "sonner"

// const TOAST_LIMIT = 1
// const TOAST_REMOVE_DELAY = 1000000

// const actionTypes = {
//   ADD_TOAST: "ADD_TOAST",
//   UPDATE_TOAST: "UPDATE_TOAST",
//   DISMISS_TOAST: "DISMISS_TOAST",
//   REMOVE_TOAST: "REMOVE_TOAST",
// }

// const toastTimeouts = new Map()

// export function useToast() {
//   const [, dispatch] = React.useReducer(toastReducer, {
//     toasts: [],
//   })

//   return {
//     toast: (props) => {
//       sonnerToast(props.title, {
//         description: props.description,
//         action: props.action,
//         ...props,
//       })
//     },
//     dismiss: (toastId) => {
//       sonnerToast.dismiss(toastId)
//     },
//   }
// }

// function toastReducer(state, action) {
//   switch (action.type) {
//     case actionTypes.ADD_TOAST:
//       return {
//         ...state,
//         toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
//       }

//     case actionTypes.UPDATE_TOAST:
//       return {
//         ...state,
//         toasts: state.toasts.map((t) =>
//           t.id === action.toast.id ? { ...t, ...action.toast } : t
//         ),
//       }

//     case actionTypes.DISMISS_TOAST: {
//       const { toastId } = action

//       // ! Side effects ! - This could be extracted into a dismissToast() action,
//       // but I'll keep it here for simplicity
//       if (toastId) {
//         setToastTimeout(toastId)
//       }

//       return {
//         ...state,
//         toasts: state.toasts.map((t) =>
//           t.id === toastId || toastId === undefined
//             ? {
//                 ...t,
//                 open: false,
//               }
//             : t
//         ),
//       }
//     }

//     case actionTypes.REMOVE_TOAST:
//       if (action.toastId === undefined) {
//         return {
//           ...state,
//           toasts: [],
//         }
//       }
//       return {
//         ...state,
//         toasts: state.toasts.filter((t) => t.id !== action.toastId),
//       }
//   }
// }

// function setToastTimeout(toastId) {
//   const timeout = setTimeout(() => {
//     toastTimeouts.delete(toastId)
//   }, TOAST_REMOVE_DELAY)

//   toastTimeouts.set(toastId, timeout)
// }