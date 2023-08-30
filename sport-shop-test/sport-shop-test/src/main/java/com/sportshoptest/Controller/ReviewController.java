package com.sportshoptest.Controller;

import com.sportshoptest.Entity.Review;
import com.sportshoptest.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin
@RestController
public class ReviewController {
    @Autowired
    ReviewService reviewService;
    @GetMapping("/review/{productId}")
    public Page<Review> getReviewByProduct(@PathVariable("productId") String productId,
                                            @RequestParam(value = "page", defaultValue = "1") Integer page,
                                           @RequestParam(value = "size", defaultValue = "6") Integer size){
        Integer productIdInt = Integer.parseInt(productId);
        PageRequest request = PageRequest.of(page - 1, size);
        return reviewService.getReviewByProduct(productIdInt,request);

    }

    @PostMapping("/review/post")
    public Review postReview(@RequestBody Review review){
        return reviewService.postReview(review);
    }
}
