# Fun Linux Terminal Commands

## 1. Matrix Effect

Install:
```bash
sudo apt install cmatrix
```

Run:
```bash
cmatrix
```

Exit:
```text
Ctrl + C
```

---

## 2. Train Running Across Terminal

Install:
```bash
sudo apt install sl
```

Run:
```bash
sl
```

Exit:
```text
Wait for animation to finish
```

---

## 3. Talking Cow

Install:
```bash
sudo apt install cowsay
```

Run:
```bash
cowsay "Hello Lokesh!"
```

---

## 4. Fortune + Cow

Install:
```bash
sudo apt install fortune cowsay
```

Run:
```bash
fortune | cowsay
```

---

## 5. ASCII Star Wars

Run:
```bash
telnet towel.blinkenlights.nl
```

Exit:
```text
Ctrl + ]
quit
```

or

```text
Ctrl + C
```

---

## 6. System Information

Install:
```bash
sudo apt install neofetch
```

Run:
```bash
neofetch
```

---

## 7. Fire Animation

Install:
```bash
sudo apt install libaa-bin
```

Run:
```bash
aafire
```

Exit:
```text
Ctrl + C
```

---

## 8. Digital Clock

Run:
```bash
watch -n 1 "date +%T"
```

Exit:
```text
Ctrl + C
```

---

## 9. Rainbow Text

Install:
```bash
sudo apt install lolcat
```

Run:
```bash
echo "Hello Linux" | lolcat
```

---

## 10. Random Password Generator

Run:
```bash
openssl rand -base64 12
```

---

## 11. Countdown Timer

Run:
```bash
for i in {10..1}; do echo $i; sleep 1; done; echo "🚀"
```

---

## 12. Fake Hacker Screen

Install:
```bash
sudo apt install hollywood
```

Run:
```bash
hollywood
```

Exit:
```text
Ctrl + C
```

---

## 13. Show Calendar

Run:
```bash
cal
```

---

## 14. Endless Cow

Run:
```bash
while true; do cowsay "Linux"; sleep 1; clear; done
```

Exit:
```text
Ctrl + C
```

---

## 15. Terminal Speech

Install:
```bash
sudo apt install espeak
```

Run:
```bash
espeak "Welcome to Linux"
```

---

## Favorite Combination

```bash
fortune | cowsay | lolcat
```

Shows a colorful talking cow with a random quote.