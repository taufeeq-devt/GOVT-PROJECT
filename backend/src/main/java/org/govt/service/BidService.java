package org.govt.service;

import org.govt.model.Bid;
import org.govt.repository.BidRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class BidService {
    private BidRepository bid;

    public BidService(BidRepository bid){
        this.bid=bid;
    }

    public String SubmitBid(String projectId, String contractorId, BigDecimal bidAmount, String ProposalText, String status) {
        Bid bid1 = new Bid(projectId, contractorId, bidAmount, ProposalText, status);
        bid.save(bid1);
        return "Bid Submitted";
    }
}
