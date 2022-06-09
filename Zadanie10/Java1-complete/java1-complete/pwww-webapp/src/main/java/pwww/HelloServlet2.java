/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pwww;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.annotation.Resource;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

@WebServlet(value = "/hello2")
public class HelloServlet2 extends HttpServlet {

    @Resource(name = "name", type = Integer.class)
    private Integer number;

    @Resource(name = "jdbc/DSTestPool", type = DataSource.class)
    private DataSource ds;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
        PrintWriter out = response.getWriter();
        out.println("<h1>Hello Servlet2</h1>");
        out.println("session=" + request.getSession(true).getId());
        out.println("<br> Resource: " + number);

        try {
            InitialContext ctx = new InitialContext();
//            DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/DSTestPool"); //*
            out.println("<br> DataSource obtained: " + ds);
            out.println("<br/>");
            Connection c = ds.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery("SELECT * FROM student");
            while (rs.next()) {
                out.print(rs.getString("imie"));
                out.print(" ");
                out.print(rs.getString("nazwisko"));
                out.println("<br/>");
            }
            c.close();
        } catch (Exception e) {
            out.println("Unsuccessful...");
            out.println(e.getMessage());
            e.printStackTrace(out);
        }

    }

}
