import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCuteAnimals } from "./actions";

export default function CuteAnimals() {
    const dispatch = useDispatch();
    const cuteAnimals = useSelector(state => state.cuteAnimals);
    console.log("cuteAnimals:", cuteAnimals);

    useEffect(() => {
        dispatch(getCuteAnimals());
    }, []);

    return (
        <div>
            <h1>cute animals S2 </h1>
            {cuteAnimals &&
                cuteAnimals.map((animal, index) => {
                    return <h1 key={index}>{animal.name}</h1>;
                })}
        </div>
    );
}
