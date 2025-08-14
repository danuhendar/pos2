import React, { useEffect, useId, useMemo, useRef, useState } from "react";

/**
 * AutoCompleteInput
 * - Use with a static items list OR provide onSearch(term) for async results.
 * - Keyboard: Up/Down to navigate, Enter to select, Esc to close/clear.
 */
interface AutoCompleteInputProps {
    value: any,
    onChange: any,
    onSelect: any,
    items: string[],
    onSearch:any,
    minChars:number,
    placeholder:string,
    debounceMs:number,
    maxItems:number
}
const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  value,
  onChange,
  onSelect,
  items,
  onSearch,
  minChars,
  placeholder,
  debounceMs,
  maxItems
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [highlight, setHighlight] = useState(-1);
  const boxId = useId();
  const listboxId = `${boxId}-listbox`;
  const inputRef = useRef(null);

  // Debounced search (local or async)
  useEffect(() => {
    setHighlight(-1);

    const term = value?.trim() ?? "";
    if (term.length < minChars) {
      setResults([]);
      setOpen(false);
      return;
    }

    let canceled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        let out = [];
        if (onSearch) {
          out = await onSearch(term);
        } else {
          const lower = term.toLowerCase();
          out = items.filter((i) => i.toLowerCase().includes(lower));
        }
        if (!canceled) {
          setResults(out.slice(0, maxItems));
          setOpen(out.length > 0);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    }, debounceMs);

    return () => {
      canceled = true;
      clearTimeout(timer);
    };
  }, [value, items, onSearch, minChars, debounceMs, maxItems]);

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (!inputRef.current) return;
      if (!inputRef.current.parentElement.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeId = useMemo(() => {
    if (highlight < 0 || !results[highlight]) return undefined;
    return `${listboxId}-opt-${highlight}`;
  }, [highlight, results, listboxId]);

  const selectItem = (item) => {
    onSelect?.(item);
    onChange?.(item);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(results.length > 0);
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlight((h) => Math.min((h < 0 ? -1 : h) + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        break;
      case "Enter":
        if (open && highlight >= 0 && results[highlight]) {
          e.preventDefault();
          selectItem(results[highlight]);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        } else {
          onChange?.("");
        }
        break;
      default:
        break;
    }
  };

  const renderHighlighted = (text, term) => {
    const t = term.trim();
    if (!t) return text;
    const idx = text.toLowerCase().indexOf(t.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark>{text.slice(idx, idx + t.length)}</mark>
        {text.slice(idx + t.length)}
      </>
    );
  };

  return (
    <div style={{ position: "relative", maxWidth: 420 }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setOpen(results.length > 0)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-activedescendant={activeId}
        aria-haspopup="listbox"
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #ccc",
          outline: "none",
          fontSize: 14
        }}
      />

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          style={{
            position: "absolute",
            zIndex: 20,
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 6,
            listStyle: "none",
            padding: 6,
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            maxHeight: 260,
            overflowY: "auto"
          }}
        >
          {results.map((item, i) => (
            <li
              id={`${listboxId}-opt-${i}`}
              key={`${item}-${i}`}
              role="option"
              aria-selected={i === highlight}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => e.preventDefault()} // keep focus on input
              onClick={() => selectItem(item)}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                cursor: "pointer",
                background: i === highlight ? "rgba(0,0,0,0.06)" : "transparent"
              }}
            >
              {renderHighlighted(item, value)}
            </li>
          ))}

          {loading && (
            <li aria-disabled="true" style={{ padding: "8px 10px", color: "#777" }}>
              Loading…
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
