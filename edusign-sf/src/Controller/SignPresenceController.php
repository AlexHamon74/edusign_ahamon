<?php

namespace App\Controller;

use App\Entity\Lesson;
use App\Entity\UserLesson;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;

final class SignPresenceController extends AbstractController {

    public function __invoke(int $id, EntityManagerInterface $em, Security $security): JsonResponse
    {
        $user = $security->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Unauthorized'], 401);
        }
    
        $lesson = $em->getRepository(Lesson::class)->find($id);
        if (!$lesson) {
            return new JsonResponse(['message' => 'Leçon introuvable'], 404);
        }
    
        $userLesson = $em->getRepository(UserLesson::class)->findOneBy([
            'user' => $user,
            'lesson' => $lesson,
        ]);

        if (!$userLesson) {
            return new JsonResponse(['message' => 'Utilisateur non inscrit à ce cours'], 403);
        }

        if ($userLesson->isPresent()) {
            return new JsonResponse(['message' => 'Présence déjà enregistrée']);
        }
    
        $userLesson->setIsPresent(true);
        $em->flush();
    
        return new JsonResponse(['message' => 'Présence validée']);
    }
}