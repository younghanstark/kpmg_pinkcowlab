import cv2

xml = 'haarcascades/nose.xml'
nose_cascade = cv2.CascadeClassifier(xml)

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

while True:
    ret, frame = cap.read()
    frame = cv2.flip(frame, 1)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    noses = nose_cascade.detectMultiScale(gray, 1.05, 5)
    if len(noses):
        print("Non-Mask Face Detected! Count:", len(noses))
    else:
        print("Non-Mask Face Undetected")

    if len(noses):
        for (x, y, w, h) in noses:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

    cv2.imshow('result', frame)

    k = cv2.waitKey(30) & 0xff
    if k == 27:  # Press Esc to terminate
        break

cap.release()
cv2.destroyAllWindows()
