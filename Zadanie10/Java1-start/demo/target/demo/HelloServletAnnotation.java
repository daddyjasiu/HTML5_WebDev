public class HelloServletAnnotation extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse
     response) throws
    ServletException, IOException {
     response.setContentType("text/html");
     response.setStatus(HttpServletResponse.SC_OK);
     PrintWriter out = response.getWriter();
     out.println("<h1>Hello Servlet through annotation</h1>");
     out.println("session=" + request.getSession(true).getId());
     }
    }
    