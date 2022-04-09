import React, { useState, useEffect } from "react";
import classes from "./TrafficLight.module.css";

let curIdex = 0;

const TrafficLight = () => {
  const [lights, setLights] = useState([
    { on: true, color: "red", id: 0 },
    { on: false, color: "green", id: 1 },
    { on: false, color: "yellow", id: 2 },
  ]);
  useEffect(() => {
    const timer = setTimeout(() => {
      curIdex += 1;
      if (curIdex >= lights.length) curIdex = 0;

      toggleLight(lights[curIdex]);
    }, 1000 * 10);

    return () => clearTimeout(timer);
  }, [lights]);

  const toggleLight = (curLight) => {
    setLights(
      lights.map((light) =>
        light === curLight
          ? { ...light, on: !light.on }
          : { ...light, on: false }
      )
    );
  };

  return (
    <div className={classes.container}>
      {lights.map((light) => {
        return (
          <div
            key={light.id}
            className={light.on ? classes[light.color] : ""}
            onClick={() => toggleLight(light)}
          />
        );
      })}
    </div>
  );
};

export default TrafficLight;
