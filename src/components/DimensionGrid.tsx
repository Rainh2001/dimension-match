import {
  useCallback,
  useRef,
  MouseEvent as ReactMouseEvent,
  useState,
} from "react";
import { MINIMUM_BOX_WIDTH } from "../constants";

interface DimensionGridProps {
  rows: number;
  columns: number;
  boxWidth: number;
}

interface Position {
  row: number;
  column: number;
}

function DimensionGrid({ rows, columns, boxWidth }: DimensionGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const [startPos, setStartPos] = useState<Position | null>(null);
  const [endPos, setEndPos] = useState<Position | null>(null);

  const boxMouseDown = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const column = Math.floor((e.pageX - rect.x) / boxWidth);
      const row = Math.floor((e.pageY - rect.y) / boxWidth);

      setStartPos({ row, column });
      setEndPos({ row, column });

      const mouseMoveHandler = (e: MouseEvent) => {
        const column = Math.floor((e.pageX - rect.x) / boxWidth);
        const row = Math.floor((e.pageY - rect.y) / boxWidth);
        setEndPos({ row, column });
      };

      const mouseUpHandler = (e: MouseEvent) => {
        gridRef.current?.removeEventListener("mousemove", mouseMoveHandler);
        gridRef.current?.removeEventListener("mouseup", mouseUpHandler);
        setStartPos(null);
        setEndPos(null);
      };

      gridRef.current.addEventListener("mousemove", mouseMoveHandler);
      gridRef.current.addEventListener("mouseup", mouseUpHandler);
    },
    [boxWidth]
  );

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${MINIMUM_BOX_WIDTH}px, 1fr))`,
      }}
      ref={gridRef}
      onMouseDown={boxMouseDown}
    >
      {Array.from(Array(rows).keys()).map((rowNum) =>
        Array.from(Array(columns).keys()).map((columnNum) => {
          const highlighted =
            startPos &&
            endPos &&
            rowNum >= startPos.row &&
            rowNum <= endPos.row &&
            columnNum >= startPos.column &&
            columnNum <= endPos.column;

          return (
            <div
              className="box"
              key={`${rowNum}/${columnNum}`}
              {...(highlighted
                ? { style: { backgroundColor: "red", border: "1px solid red" } }
                : {})}
            />
          );
        })
      )}
    </div>
  );
}

export default DimensionGrid;
