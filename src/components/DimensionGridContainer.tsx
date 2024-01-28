import { useEffect, useRef, useState } from "react";
import DimensionGrid from "./DimensionGrid";
import "./styles/DimensionGrid.scss";
import { MINIMUM_BOX_WIDTH } from "../constants";

function DimensionGridContainer() {
  const gridRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [boxWidth, setBoxWidth] = useState<number>(0);

  useEffect(() => {
    if (gridRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const containerWidth = entries[0].contentRect.width;
        const containerHeight = entries[0].contentRect.height;
        const columnCount = Math.floor(containerWidth / MINIMUM_BOX_WIDTH);
        const newBoxWidth =
          MINIMUM_BOX_WIDTH +
          (containerWidth - columnCount * MINIMUM_BOX_WIDTH) / columnCount;

        setColumns(Math.floor(containerWidth / newBoxWidth));
        setRows(Math.floor(containerHeight / newBoxWidth));
        setBoxWidth(newBoxWidth);
      });

      resizeObserver.observe(gridRef.current);
    }
  }, []);

  return (
    <div className="grid-container" ref={gridRef}>
      <DimensionGrid rows={rows} columns={columns} boxWidth={boxWidth} />
    </div>
  );
}

export default DimensionGridContainer;
