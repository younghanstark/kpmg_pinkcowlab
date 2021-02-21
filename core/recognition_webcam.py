import cv2
import base64
import numpy as np
import sys

xml = '../core/haarcascades/nose.xml'
nose_cascade = cv2.CascadeClassifier(xml)

imgCode_input = sys.argv[1]


imgCode = imgCode_input.split(",",1)
#print(imgCode)

# def readb64(base64_string):
#     sbuf = BytesIO()
#     sbuf.write(base64.b64decode(base64_string))
#     pimg = Image.open(sbuf)
#     return cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)

# cvimg = readb64(testImg)
# cv2.imshow('test', cvimg)


 # raw data with base64 encoding
#print(imgCode)
decoded_data = base64.b64decode(imgCode[1])
np_data = np.frombuffer(decoded_data,dtype=np.uint8)
img = cv2.imdecode(np_data,cv2.IMREAD_UNCHANGED)



# plt.figure()
# plt.imshow(cvimg, cmap="gray")



frame = img
#print(frame)
frame = cv2.flip(frame, 1)
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)


noses = nose_cascade.detectMultiScale(gray, 1.05, 5)
# if len(noses):
#     # print("Non-Mask Face Detected! Count:", len(noses))
# else:
#     # print("Non-Mask Face Undetected")

if len(noses):
    for (x, y, w, h) in noses:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

retval, buffer = cv2.imencode('.jpg', frame)
jpg_as_text = base64.b64encode(buffer)
test = jpg_as_text.decode()
print("data:image/jpeg;base64," + test)




# cap.release()
# cv2.destroyAllWindows()
