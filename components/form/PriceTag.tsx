import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface PriceTagProps {
  name: string;
  price: string;
  barcode: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ name, price, barcode }) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, barcode, {
        format: 'CODE128',
        width: 1.8,
        height: 40,
        displayValue: false,
      });
    }
  }, [barcode]);

  return (
    <div className="w-64 p-2 text-sm text-center border-2 border-dashed">
      <h2 className="mb-2 font-bold">{name}</h2>
      <p className="mb-2 text-lg font-semibold">Rp {price}</p>
      <svg ref={barcodeRef}></svg>
      <label className="block mt-2 text-xs font-semibold">{barcode}</label>
    </div>
  );
};

export default PriceTag;
