# 🚀 הוראות פרסום ל-GitHub Pages

## ✅ מה עשינו:

1. **הוספנו את חבילת `gh-pages`**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **עדכנו את `package.json`**
   - הוספנו `homepage` עם הכתובת הסופית
   - הוספנו סקריפטים `predeploy` ו-`deploy`

3. **עדכנו את `vite.config.js`**
   - הוספנו `base: '/examHelper/'` כדי שהאפליקציה תעבוד בתת-תיקייה

4. **יצרנו GitHub Actions workflow**
   - קובץ `.github/workflows/deploy.yml`
   - פרסום אוטומטי בכל push ל-main/master

---

## 📋 שלבים נוספים ב-GitHub:

### 1. הפעל GitHub Pages בריפו:

1. עבור ל-**GitHub repository**: https://github.com/LinoyBu96/learn
2. לחץ על **Settings** (הגדרות)
3. בתפריט הצד, לחץ על **Pages**
4. תחת **Source**, בחר:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. לחץ **Save**

### 2. המתן לפרסום:

- GitHub Actions יבנה וישתמש את האפליקציה אוטומטית
- תוכל לראות את ההתקדמות בטאב **Actions** בריפו
- זה לוקח בערך 2-3 דקות

---

## 🌐 הקישור הסופי שלך:

```
https://LinoyBu96.github.io/examHelper
```

**או:**

```
https://linoybu96.github.io/examHelper
```

(GitHub Pages לא רגיש לאותיות גדולות/קטנות ב-username)

---

## 🔄 עדכונים עתידיים:

כל פעם שתעשי `git push` ל-main/master, האפליקציה תתעדכן אוטומטית!

```bash
# עשה שינויים בקוד
git add .
git commit -m "תיאור השינוי"
git push

# GitHub Actions יפרסם אוטומטית!
```

---

## 🛠️ פרסום ידני (אופציונלי):

אם תרצי לפרסם ידנית במקום דרך GitHub Actions:

```bash
npm run deploy
```

זה יבנה את האפליקציה וידחוף אותה ל-branch `gh-pages`.

---

## ✨ טיפים:

1. **בדוק שהאפליקציה עובדת לוקלית לפני push:**
   ```bash
   npm run build
   npm run preview
   ```

2. **אם משהו לא עובד:**
   - בדוק את הלוגים ב-**Actions** tab ב-GitHub
   - וודא ש-GitHub Pages מופעל בהגדרות
   - וודא שה-branch `gh-pages` קיים

3. **שיתוף הקישור:**
   - אפשר לשתף את הקישור עם כל מי שתרצי
   - האפליקציה תהיה זמינה 24/7 חינם!
   - עובד על כל מכשיר עם דפדפן

---

## 🎉 זהו!

האפליקציה שלך עכשיו זמינה באינטרנט!

