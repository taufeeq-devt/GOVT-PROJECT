package org.govt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document("Bids")
public class Bid {
    @Id
    private String Id;

    private String projectId;
    private String contractorId;
    private BigDecimal bidAmount;
    private String proposalText;
    private String status;
    private LocalDate createdAt;

    public Bid(String projectId,String contractorId,BigDecimal bidAmount,String ProposalText,String status){
        this.projectId=projectId;
        this.contractorId=contractorId;
        this.bidAmount=bidAmount;
        this.proposalText=ProposalText;
        this.status=status;
        this.createdAt=LocalDate.now();
    }
}
