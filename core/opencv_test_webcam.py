import cv2


def find_frontalfaces(frame):
    face_xml = 'haarcascades/haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(face_xml)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    result = face_cascade.detectMultiScale(gray, 1.05, 5)
    return result


def find_noses(frame):
    nose_xml = 'haarcascades/nose.xml'
    nose_cascade = cv2.CascadeClassifier(nose_xml)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    result = nose_cascade.detectMultiScale(gray, 1.05, 5)
    return result


def inside(outer_rect, inner_rect):
    out_x, out_y, out_w, out_h = outer_rect
    inn_x, inn_y, inn_w, inn_h = inner_rect
    if out_x < inn_x and \
        inn_x + inn_w < out_x + out_w and \
        out_y < inn_y and \
        inn_y + inn_h < out_y + out_h:
        return True
    return False


def range_limit(face):
    x, y, h, w = face
    return x, y + h * 0.3, h * 0.7, w


cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

while True:
    ret, frame = cap.read()
    frame = cv2.flip(frame, 1)

    faces = find_frontalfaces(frame)
    noses = find_noses(frame)

    if len(faces):
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

    if len(noses):
        for (x, y, w, h) in noses:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    if len(faces):
        for face in faces:
            for nose in noses:
                if inside(range_limit(face), nose):
                    x, y, w, h = nose
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)

    cv2.imshow('result', frame)

    k = cv2.waitKey(30) & 0xff
    if k == 27:  # Press Esc to terminate
        break

cap.release()
cv2.destroyAllWindows()
