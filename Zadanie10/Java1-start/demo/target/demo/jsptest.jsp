<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

 <title>JSP Page</title>
</head>
<body>
<%
 int x = 5;
%>
<h1>
 <%for(int i=0;i<10;i++) { %>
 <%=x%><br>
 <%}%>
</h1>
</body>
</html>
