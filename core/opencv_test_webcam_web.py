import cv2
import base64
import numpy as np
import sys

def find_frontalfaces(frame):
    face_xml = '../core/haarcascades/haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(face_xml)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    result = face_cascade.detectMultiScale(gray, 1.05, 5)
    return result


def find_noses(frame):
    nose_xml = '../core/haarcascades/nose.xml'
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


imgCode_input = []
frame = ""

for line in sys.stdin:
    imgCode_input.append(line)

imgCode_input

if(len(imgCode_input) == 0):
    print("")
    quit()


fx, fy, fw, fh = 0,0,0,0
imgCode = imgCode_input[0].split(",", 1)
if(len(imgCode) >1):
    decoded_data = base64.b64decode(imgCode[1])
    np_data = np.frombuffer(decoded_data,dtype=np.uint8)
    img = cv2.imdecode(np_data,cv2.IMREAD_UNCHANGED)

    frame = img

    

    faces = find_frontalfaces(frame)
    noses = find_noses(frame)
    mask = True

    # if len(faces):
    #     for (x, y, w, h) in faces:
    #         cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

    # if len(noses):
    #     for (x, y, w, h) in noses:
    #         cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    indexNum = 0
    resultString = ""
    if len(faces):
        for face in faces:
            for nose in noses:
                if inside(range_limit(face), nose):
                    x, y, w, h = face
                    # cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
                    resultString += ",data%d,%d,%d,%d,%d" % (indexNum, x, y, w, h)
                    indexNum += 1


    
    # cv2.imshow('result', frame)

    # k = cv2.waitKey(30) & 0xff
    # if k == 27:  # Press Esc to terminate
    #     break

    # cap.release()
    # cv2.destroyAllWindows()

    # retval, buffer = cv2.imencode('.jpg', frame)
    # jpg_as_text = base64.b64encode(buffer)
    # test = jpg_as_text.decode()
    print(resultString)

# cap = cv2.VideoCapture(0)
# cap.set(3, 640)
# cap.set(4, 480)

# while True:

