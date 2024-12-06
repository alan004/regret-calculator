import React, { useEffect, useState } from "react"
import "./App.css"
import {
  Box,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Container,
  Typography,
} from "@mui/material"
import currency from "currency.js"
import { translations } from "./utils/translations"
import git from "./assets/github.svg"
import linkedin from "./assets/linkedin.svg"
import { calculateEndValue } from "./utils/functions"

type Translations = typeof translations
type LanguageKey = keyof Translations

function App() {
  const [value, setValue] = useState<number | undefined>()
  const [fromCurrency, setFromCurrency] = useState<string>("")
  const toCurrency = "BTC"
  const [startDate, setStartDate] = useState<string>("")
  const [endValue, setEndValue] = useState<number | null>(null)
  const [language, setLanguage] = useState<LanguageKey>("pt")
  const [texts, setTexts] = useState(translations[language])

  const handleLanguageChange = (lang: LanguageKey) => {
    setLanguage(lang)
    setTexts(translations[lang])
  }

  const stylesForInput = {
    "& .MuiInputBase-root": {
      color: "#F29F58",
    },
    "& .MuiOutlinedInput-root": {
      borderColor: "#F29F58",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F29F58",
    },
    "& .MuiInputLabel-root": {
      color: "#F29F58",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#F29F58",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F29F58",
    },
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value.valueOf()))
  }

  const handleFromCurrencyChange = (event: SelectChangeEvent) => {
    setFromCurrency(event.target.value as string)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value)
  }

  useEffect(() => {
    const fetchFinalValue = async () => {
      if (value && fromCurrency && toCurrency && startDate) {
        const calculatedValue = await calculateEndValue(
          value,
          fromCurrency,
          toCurrency,
          startDate
        )
        setEndValue(calculatedValue)
      }
    }
    fetchFinalValue()
  }, [value, fromCurrency, startDate])

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>
        {texts.title}
      </Typography>
      <Box display="flex" flexDirection="row" gap={2} sx={stylesForInput}>
        <FormControl fullWidth>
          <TextField
            label={texts.initialValue}
            id="value-input"
            type="number"
            value={value}
            onChange={handleValueChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="from-currency-label">{texts.currency}</InputLabel>
          <Select
            labelId="from-currency-label"
            id="from-currency-select"
            value={fromCurrency}
            label="Package Type"
            onChange={handleFromCurrencyChange}
          >
            <MenuItem value="BRL">REAL</MenuItem>
            <MenuItem value="USD">DOLÁR</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="start-date"
            label={texts.startDate}
            type="date"
            value={startDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: "2012-01-01",
            }}
          />
        </FormControl>
      </Box>
      {endValue != null ? (
        <Box padding={"10px 0"} flex={"column"} gap={"10px"}>
          <Typography variant={"h2"} sx={{
                fontSize: {
                  xs: "2rem", 
                  sm: "3rem", 
                  md: "4rem", 
                  lg: "5rem", },
                fontWeight: "bold", 
                textAlign: "center",
              }}>
            {fromCurrency === "BRL"
              ? currency(endValue, {
                  symbol: "R$",
                  separator: ".",
                  decimal: ",",
                }).format()
              : currency(endValue, {
                  symbol: "$",
                  separator: ",",
                  decimal: ".",
                }).format()}
          </Typography>
          <Typography>{texts.currentValueMessage}</Typography>
        </Box>
      ) : (
        <></>
      )}

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "rgba(49, 7, 79, 0.8)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          sx={{
            display: "flex",

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem 10px",
            gap: "3rem",
          }}
        >
          {" "}
          <Select
            sx={{
              color: "white",
              fontSize: "14px",
              "& .MuiOutlinedInput-root": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            value={language}
            onChange={(e) => {
              const lang = e.target.value
              if (lang === "en" || lang === "pt") {
                handleLanguageChange(lang)
              }
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="pt">Português</MenuItem>
          </Select>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Typography sx={{ color: "white", fontSize: "14px" }}>
              {texts.developedBy} Alan Abilio
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/alan-abilio/"
              >
                <img
                  src={linkedin}
                  alt="Logo Linkedin"
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>
              <Link target="_blank" href="https://github.com/alan004">
                <img
                  src={git}
                  alt="Logo Github"
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default App
