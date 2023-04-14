import React from "react";
import "./bootstrap.min.css";

export default function EmotionTable(props) {
  //Returns the emotions as an HTML table
  return (
    <div>
      <table className="table table-bordered">
        <tbody>
          {Object.entries(props.emotions).map((emotion) => {
            return (
              <tr>
                <td>{emotion[0]}</td>
                <td>{emotion[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
