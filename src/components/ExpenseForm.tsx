import { categories } from "../data/categories";
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import { useState } from "react";
import { DraftExpense, Value } from "./types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";





export default function ExpenseForm() {
    const [expense,setExpense] = useState<DraftExpense>({
        amount:0,
        expenseName: "",
        category:"",
        date: new Date()
    })

    const [error,seetError] = useState("")
    const {dispatch}= useBudget()

    const handleChangeDate = (value : Value) =>{
        setExpense({
            ...expense,
            date:value
        })
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) =>{
        const {name,value} = e.target
        const isAmountField = ["amount"].includes(name)
        setExpense({
            ...expense,
            [name]:isAmountField ? Number(value) : value
        })
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        if(Object.values(expense).includes("")){
            seetError("Todos los campos son obligatorios")
            return
        }

        dispatch({type: "add-expense",payload:{expense}})
        setExpense({
            amount:0,
            expenseName: "",
            category:"",
            date: new Date() 
        })
    }
    
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2"
            >Nuevo Gasto

            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>



            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej.300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>


            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >
                    Categoría:
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    onChange={handleChange}
                    value={expense.category}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            value={category.id}
                            key={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Fecha gasto:
                </label>
                    <DatePicker 
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                    />
       
            </div>

            <input 
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={"Registrar Gasto"}
            
            />


        </form>)
}
