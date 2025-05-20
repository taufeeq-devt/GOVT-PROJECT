package org.govt.Controller;

import org.govt.model.Bid;
import org.govt.repository.BidRepository;
import org.govt.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@CrossOrigin("*")
@RestController
@RequestMapping("/bids")
public class BidControl {

    private BidRepository bid;
    private BidService bidService;

    @PostMapping("/")
    public String SubmitBid(String projectId, String contractorId, BigDecimal bidAmount, String ProposalText, String status){
       return bidService.SubmitBid(projectId, contractorId, bidAmount, ProposalText, status);
    }
}
