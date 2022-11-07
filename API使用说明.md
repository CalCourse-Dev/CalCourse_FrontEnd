所有的API端口都有说明，在“后端API接口说明.md”中，这里不再赘述。
每个端口都有配套的function可以直接调用，在src/requests文件夹里。
“DynamoDB结构说明.py”中是对我们现在数据库DynamoDB里存储的数据类型的结构说明，一并放在这里作为参考。


API Call举例：
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

