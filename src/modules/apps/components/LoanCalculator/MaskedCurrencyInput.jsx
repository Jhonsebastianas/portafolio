import React, { useState, useEffect, useRef } from "react";
import { formatMaskedNumber, parseMaskedNumber, getThousandSeparator } from "./loanUtils";

/**
 * Componente de Input con máscara de separación de miles en tiempo real
 * Compatible con COP (.), USD (,), EUR (.), MXN (,)
 */
const MaskedCurrencyInput = ({
  id,
  value,
  onChange,
  currency = "COP",
  placeholder = "0",
  disabled = false,
  min = 0,
  max,
  className = "",
  style = {},
  ariaLabel,
}) => {
  const inputRef = useRef(null);
  const [displayValue, setDisplayValue] = useState("");
  const cursorRef = useRef(null);

  // Sincronizar el valor numérico externo con la representación formateada
  useEffect(() => {
    if (value === null || value === undefined || value === "") {
      setDisplayValue("");
    } else {
      const formatted = formatMaskedNumber(value, currency);
      setDisplayValue(formatted);
    }
  }, [value, currency]);

  // Mantener la posición del cursor después de que React re-renderice
  useEffect(() => {
    if (cursorRef.current !== null && inputRef.current) {
      const pos = Math.min(cursorRef.current, inputRef.current.value.length);
      inputRef.current.setSelectionRange(pos, pos);
      cursorRef.current = null;
    }
  });

  const handleChange = (e) => {
    const input = e.target;
    const rawVal = input.value;
    const currentCursor = input.selectionStart || 0;

    // Contar cuántos dígitos numéricos había antes de la posición del cursor
    const textBeforeCursor = rawVal.slice(0, currentCursor);
    const digitsBeforeCursor = textBeforeCursor.replace(/\D/g, "").length;

    // Extraer únicamente los dígitos
    const cleanDigits = rawVal.replace(/\D/g, "");

    if (cleanDigits === "") {
      cursorRef.current = 0;
      setDisplayValue("");
      if (onChange) onChange(0);
      return;
    }

    let numericVal = parseInt(cleanDigits, 10);
    if (isNaN(numericVal)) numericVal = 0;

    if (max !== undefined && numericVal > max) {
      numericVal = max;
    }

    const formatted = formatMaskedNumber(numericVal, currency);
    setDisplayValue(formatted);

    // Calcular la nueva posición del cursor en la cadena formateada
    let targetCursor = 0;
    let seenDigits = 0;
    while (targetCursor < formatted.length && seenDigits < digitsBeforeCursor) {
      if (/\d/.test(formatted[targetCursor])) {
        seenDigits++;
      }
      targetCursor++;
    }

    cursorRef.current = targetCursor;

    if (onChange) {
      onChange(numericVal);
    }
  };

  const handleKeyDown = (e) => {
    const input = inputRef.current;
    if (!input) return;

    const sep = getThousandSeparator(currency);

    // Si el usuario presiona Backspace y el carácter inmediatamente anterior es un separador de miles
    if (e.key === "Backspace") {
      const cursor = input.selectionStart;
      if (cursor === input.selectionEnd && cursor > 0) {
        const charBefore = input.value[cursor - 1];
        if (charBefore === sep) {
          e.preventDefault();
          const currentVal = input.value;
          // Eliminar el separador y el dígito antes de él
          const newVal = currentVal.slice(0, cursor - 2) + currentVal.slice(cursor);
          const cleanDigits = newVal.replace(/\D/g, "");
          const numericVal = cleanDigits ? parseInt(cleanDigits, 10) : 0;

          const formatted = cleanDigits === "" ? "" : formatMaskedNumber(numericVal, currency);
          setDisplayValue(formatted);

          const newCursorPos = Math.max(0, cursor - 2);
          cursorRef.current = newCursorPos;

          if (onChange) {
            onChange(numericVal);
          }
        }
      }
    }
  };

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      style={style}
      aria-label={ariaLabel}
      autoComplete="off"
    />
  );
};

export default MaskedCurrencyInput;
