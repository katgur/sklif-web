import { useSelector } from "react-redux";
import { selectAll, selectDirectories, selectFiles } from "./storageSlice";
import { useEffect, useState } from "react";


function FileAnalytics() {
    const dirs = useSelector(selectDirectories);
    const files = useSelector(selectFiles);
    const all = useSelector(selectAll);
    const [data, setData] = useState();

    useEffect(() => {
        if (dirs.length === 0 || files.length === 0 || all.length === 0) {
            return;
        }
        setData([
            {
                number: files.length, unit: "Количество файлов"
            },
            {
                number: dirs.length, unit: "Количество директорий"
            },
            {
                number: Math.round((all.reduce((accumulator, file) => accumulator + file.size).length / 1024)) + " MB", unit: "Занятая память"
            }
        ])
    }, [dirs, files, all, setData])

    return (data &&
        <div className="card analytics">
            {
                data.map(d => {
                    return (
                        <div>
                            <h2>
                                {d.number}
                            </h2>
                            <span>
                                {d.unit}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FileAnalytics;