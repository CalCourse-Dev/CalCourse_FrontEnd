所有的API端口都有说明，在后端repo的“后端API接口说明.md”中，这里不再赘述。

举例：

`const responseHandler = (response: any) => {`

  `console.log("success");`

  `console.log(response);`

  `// do something with the response data`

 `};`



 `const errorHandler = (error: any) => {`

  `console.log("failed");`

  `console.log(error);`

  `// handle the error`

 `};`



 `const newMissingRecord = {`

  `department_code: "COMPSCI",`

  `course_code: "61A",`

  `lecture_id: "001",`

  `course_term: "Fa22",`

 `}`



这是用request body的形式:

 `CourseAPI.reportMissingClass(newMissingRecord, responseHandler, errorHandler);`

这是用正常的path parameter的形式:

 `CourseAPI.getAllCourses("huanzhimao@berkeley.edu", "123456", responseHandler, errorHandler);`

