package org.govt.Authentication;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.govt.model.*;
import org.govt.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserSupplierRepository userSupplier;

    @Autowired
    private UserContractorRepository userContractor;

    @Autowired
    private UserGovtRepository userGovt;

    @Autowired
    private UserProjectManagerRepository userProject;

    @Autowired
    private UserSupervisorRepository userSupervisor;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(token);
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = findUserByUsername(username);

            if (userDetails != null && jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private UserDetails findUserByUsername(String username) {
        User_Supplier supplier = userSupplier.findByUsername(username);
        if (supplier != null) return supplier;

        User_contractor contractor = userContractor.findByUsername(username);
        if (contractor != null) return contractor;

        User_ProjectManager project = userProject.findByUsername(username);
        if (project != null) return project;

        User_govt govt = userGovt.findByUsername(username);
        if (govt != null) return govt;

        User_Supervisor supervisor = userSupervisor.findByUsername(username);
        if (supervisor != null) return supervisor;

        return null;
    }
}
